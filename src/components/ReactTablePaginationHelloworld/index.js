import React, { useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import matchSorter from 'match-sorter';
import Toolbar from './Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Highlighter from 'react-highlight-words';

import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import VolumeUp from '@material-ui/icons/VolumeUp';
import ClearIcon from '@material-ui/icons/Clear';

import { useTable, usePagination, useFilters, useGlobalFilter, useAsyncDebounce } from 'react-table';

import {
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  makeStyles,
  Button,
  Input,
  Slider,
  Grid,
  Select,
  MenuItem,
} from '@material-ui/core';

import useMutateDatatypes from 'src/hooks/useMutateDatatypes';

import makeData from './makeData';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(6, 0, 3),
  },
  lightBulb: {
    verticalAlign: 'middle',
    marginRight: theme.spacing(1),
  },
  highlight_text: { backgroundColor: '#f9ca24', fontSize: '2rem' },
}));

const LOG_PREFIX = 'ReactTablePaginationHelloworld';

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => setGlobalFilter(value || undefined), 200);

  return (
    <span>
      Search:
      <Input
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
      />
    </span>
  );
}

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);
  const [age, setAge] = React.useState('');
  const handleChange = (e) => {
    setFilter(e.target.value || undefined);
  };

  // Render a multi-select box
  return (
    <>
      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={filterValue} onChange={handleChange}>
        {options.map((option, i) => (
          <MenuItem value={option}>{option}</MenuItem>
        ))}
      </Select>
      <IconButton aria-label="clear" size="small" onClick={() => setFilter(undefined)}>
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </>
  );
}

function NumberRangeColumnFilter({ column: { filterValue = [], preFilteredRows, setFilter, id } }) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  return (
    <div style={{ display: 'flex' }}>
      <Input
        value={filterValue[0] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [val ? parseInt(val, 10) : undefined, old[1]]);
        }}
        placeholder={`Min (${min})`}
        style={{ width: '70px', marginRight: '0.5rem' }}
      />
      to
      <Input
        value={filterValue[1] || ''}
        type="number"
        onChange={(e) => {
          const val = e.target.value;
          setFilter((old = []) => [old[0], val ? parseInt(val, 10) : undefined]);
        }}
        placeholder={`Max (${max})`}
        style={{ width: '70px', marginLeft: '0.5rem' }}
      />
    </div>
  );
}

function SliderColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }) {
  const [min, max] = React.useMemo(() => {
    let min = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    let max = preFilteredRows.length ? preFilteredRows[0].values[id] : 0;
    preFilteredRows.forEach((row) => {
      min = Math.min(row.values[id], min);
      max = Math.max(row.values[id], max);
    });
    return [min, max];
  }, [id, preFilteredRows]);

  const [value, setValue] = React.useState(30);
  const handleChange = (event, newValue) => {
    setFilter(parseInt(newValue, 10));
  };

  return (
    <>
      <Slider value={filterValue || min} onChange={handleChange} aria-labelledby="continuous-slider" />
      {/* <Button onClick={() => setFilter(undefined)}>Off</Button> */}
      <IconButton aria-label="clear" size="small" onClick={() => setFilter(undefined)}>
        <ClearIcon fontSize="inherit" />
      </IconButton>
    </>
  );
}

function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }) {
  const count = preFilteredRows.length;

  return (
    <Input
      value={filterValue || ''}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function MuiTable({ columns, data, fetchData, loading, pageCount: controlledPageCount }) {
  const classes = useStyles();

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    preGlobalFilteredRows,
    // Get the state from the instance
    state,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 50 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
      defaultColumn,
      filterTypes,
    },
    useFilters,
    useGlobalFilter,
    usePagination
  );

  const total = 0;
  const handlePageChange = (e, page) => {
    console.log('page', page);
    gotoPage(page);
  };
  const handleLimitChange = (e) => {
    // alert('helloworld');
    // setPageSize
    setPageSize(e.target.value);
  };
  const current_page = 0;
  const per_page = 0;

  // Listen for changes in pagination and use the state to fetch our new data
  React.useEffect(() => {
    fetchData({ pageIndex: state.pageIndex, pageSize: state.pageSize });
  }, [fetchData, state.pageIndex, state.pageSize]);

  // Render the UI for your table

  if (loading) return <>loading</>;

  return (
    <>
      <Toolbar
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Card className={clsx(classes.root)}>
        <PerfectScrollbar>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>
                      <Box>{column.render('Header')}</Box>
                      <Box>{column.canFilter ? column.render('Filter') : null}</Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* <TableRow>
                <TableCell colSpan={visibleColumns.length} style={{ textAlign: 'left' }}>
                  <GlobalFilter
                    preGlobalFilteredRows={preGlobalFilteredRows}
                    globalFilter={state.globalFilter}
                    setGlobalFilter={setGlobalFilter}
                  />
                </TableCell>
              </TableRow> */}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <>
                          <TableCell {...cell.getCellProps()}>
                            <Highlighter
                              highlightClassName={classes.highlight_text}
                              searchWords={[state.globalFilter]}
                              autoEscape={true}
                              textToHighlight={cell.value}
                            />
                          </TableCell>
                        </>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={controlledPageCount * state.pageSize}
          onChangePage={(e) => {}}
          onPageChange={(e, page) => handlePageChange(e, page)}
          onRowsPerPageChange={handleLimitChange}
          page={state.pageIndex}
          rowsPerPage={state.pageSize}
          rowsPerPageOptions={[10, 50, 100, 500]}
        />
      </Card>
    </>
  );
}

// Let's simulate a large dataset on the server (outside of our component)
// const serverData = makeData(12);

function App() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Info',
        columns: [
          { Header: 'varchartype', accessor: 'varchartype', filter: 'fuzzyText' },
          { Header: 'inttype', accessor: 'inttype', Filter: NumberRangeColumnFilter, filter: 'between' },
          { Header: 'inttype1', accessor: 'inttype1', Filter: SliderColumnFilter, filter: 'equals' },
          { Header: 'inttype2', accessor: 'inttype2', Filter: SliderColumnFilter, filter: filterGreaterThan },
          { Header: 'yeartype', accessor: 'yeartype', Filter: SelectColumnFilter, filter: 'includes' },
          { Header: 'datetype', accessor: 'datetype', filter: 'fuzzyText' },
          { Header: 'datetimetype', accessor: 'datetimetype', filter: 'fuzzyText' },
        ],
      },
    ],
    []
  );

  // We'll start our table without any data
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [pageCount, setPageCount] = React.useState(0);
  const fetchIdRef = React.useRef(0);

  let use_mutate_datatypes = useMutateDatatypes();

  const fetchData = React.useCallback(({ pageSize, pageIndex }) => {
    // Give this fetch an ID
    const fetchId = ++fetchIdRef.current;

    // Set the loading state
    setLoading(true);

    use_mutate_datatypes.mutateAsync({ pageSize, pageIndex }).then((res) => {
      let serverData = res.data;
      if (fetchId === fetchIdRef.current) {
        const startRow = pageSize * pageIndex;
        const endRow = startRow + pageSize;
        setData(serverData.slice(startRow, endRow));

        // Your server could send back total page count.
        // For now we'll just fake it, too
        setPageCount(Math.ceil(serverData.length / pageSize));

        setLoading(false);
      }
    });
  }, []);

  let [filter_input, setFilterInput] = useState('');
  let [is_loading, setIsLoading] = useState(true);
  const [sample_data, setSampleData] = useState();

  const refreshData = () => {
    setIsLoading(true);
  };

  return (
    <>
      <MuiTable columns={columns} data={data} fetchData={fetchData} loading={loading} pageCount={pageCount} />
    </>
  );
}

export default App;
