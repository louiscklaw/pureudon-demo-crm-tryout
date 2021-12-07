import React, { useState } from 'react';
import clsx from 'clsx';
import { useTable } from 'react-table';
import PerfectScrollbar from 'react-perfect-scrollbar';

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

import makeData from './makeData';
import RESPONSE_JSON from './RESPONSE_JSON';

import useMutateDatatypes from 'src/hooks/useMutateDatatypes';

const LOG_PREFIX = 'ReactTableHelloworld';

const useStyles = makeStyles((theme) => ({
  root: { margin: '1rem 0' },
  avatar: { marginRight: theme.spacing(2) },
}));

function MuiTableTest({ columns, response }) {
  const classes = useStyles();
  const { data, meta } = response;
  const { current_page, from, last_page, links, path, per_page, to, total } = meta;
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const mutate_datatypes = useMutateDatatypes();

  React.useEffect(() => {
    console.log(LOG_PREFIX, 'limit', { limit });
  }, [limit]);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const handlePageChange = (props) => {
    console.log(LOG_PREFIX, 'handlePageChange', { props });
  };

  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <>
      <div>
        <span>request sample:</span>
      </div>
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
              {rows.map((row, i) => {
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
          count={total}
          onChangePage={(e) => {}}
          onPageChange={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={current_page}
          rowsPerPage={per_page}
          rowsPerPageOptions={[10, 20]}
        />
      </Card>
      {/* <pre>{JSON.stringify(meta, null, 2)}</pre> */}
    </>
  );
}

export default () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        columns: [
          { Header: 'id', accessor: 'id' },
          { Header: 'varchartype', accessor: 'varchartype' },
          { Header: 'inttype', accessor: 'inttype' },
        ],
      },
      {
        Header: 'Info',
        columns: [
          { Header: 'yeartype', accessor: 'yeartype' },
          { Header: 'datetype', accessor: 'datetype' },
          { Header: 'datetimetype', accessor: 'datetimetype' },
        ],
      },
    ],
    []
  );

  // const data = React.useMemo(() => makeData(3), []);
  const response = React.useMemo(() => RESPONSE_JSON, []);

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <MuiTableTest columns={columns} data={response.data} response={response} />
    </>
  );
};
