import React from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';

import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';

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
} from '@material-ui/core';

import useMutateDatatypes from 'src/hooks/useMutateDatatypes';

import makeData from './makeData';

const useStyles = makeStyles((theme) => ({
  root: { margin: '1rem 0' },
  avatar: { marginRight: theme.spacing(2) },
}));

// Let's add a fetchData method to our Table component that will be used to fetch
// new data when pagination state changes
// We can also add a loading state to let our table know it's loading new data
function MuiTable({ columns, data, fetchData, loading, pageCount: controlledPageCount }) {
  const classes = useStyles();
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
    // Get the state from the instance
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }, // Pass our hoisted table state
      manualPagination: true, // Tell the usePagination
      // hook that we'll handle our own data fetching
      // This means we'll also have to provide our own
      // pageCount.
      pageCount: controlledPageCount,
    },
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
    fetchData({ pageIndex, pageSize });
  }, [fetchData, pageIndex, pageSize]);

  // Render the UI for your table

  if (loading) return <>loading</>;

  return (
    <>
      <Card className={clsx(classes.root)}>
        <PerfectScrollbar>
          <Table {...getTableProps()}>
            <TableHead>
              {headerGroups.map((headerGroup) => (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={controlledPageCount * pageSize}
          onChangePage={(e) => {}}
          onPageChange={(e, page) => handlePageChange(e, page)}
          onRowsPerPageChange={handleLimitChange}
          page={pageIndex}
          rowsPerPage={pageSize}
          rowsPerPageOptions={[10, 20]}
        />
      </Card>

      <pre>
        <code>{JSON.stringify({ pageIndex, pageSize, pageCount, canNextPage, canPreviousPage }, null, 2)}</code>
      </pre>
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
          { Header: 'varchartype', accessor: 'varchartype' },
          { Header: 'inttype', accessor: 'inttype' },
          { Header: 'yeartype', accessor: 'yeartype' },
          { Header: 'datetype', accessor: 'datetype' },
          { Header: 'datetimetype', accessor: 'datetimetype' },
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

    use_mutate_datatypes
      .mutateAsync(({ pageSize, pageIndex }) => {})
      .then((res) => {
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

  return (
    <>
      <pre>{JSON.stringify(data)}</pre>
      <MuiTable columns={columns} data={data} fetchData={fetchData} loading={loading} pageCount={pageCount} />
    </>
  );
}

export default App;
