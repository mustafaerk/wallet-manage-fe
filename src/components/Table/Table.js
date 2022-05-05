/* eslint-disable no-undef */
import React, { useEffect, useRef } from "react"
import PropTypes from "prop-types";
import $ from 'jquery'

    import "./Table.css";

const Table = ({ data, tableCols, columnDefs, handleEditClick, handleDeleteClick }) => {
    $.DataTable = require('datatables.net')
    const tableRef = useRef()
    useEffect(() => {
        const table = $(tableRef.current).DataTable(
            {
                data: data,
                columns: [...tableCols,
                {
                    targets: -1,
                    data: null,
                    defaultContent: "<div id='buttonWrapper'> <button  id='edit'>Edit</button><button id='delete'>Delete</button> </div>"
                }
                ],
                columnDefs: columnDefs,
                responsive: true,
                destroy: true  // I think some clean up is happening here
            }
        )

        $('#table tbody').on('click', '#edit', function () {
            var data = table.row($(this).parents('tr')).data();

            handleEditClick(data);
            $("#table tbody").off("click", "#edit");
            $("#table tbody").off("click", "#delete");
        });


        $('#table tbody').on('click', '#delete', function () {
            const row = $(this).closest('tr');
            const data = table.row(row).data();
            handleDeleteClick(data);
            $("#table tbody").off("click", "#edit");
            $("#table tbody").off("click", "#delete");
        });

        table.draw();

        return function () {
            table.destroy();
        }
    }, [data, tableRef])

    return (
        <div className="w-auto sm:w-full">
            <table id="table" width="100%" ref={tableRef}></table>
        </div>
    )
}

Table.propTypes = {
    data: PropTypes.array,
    columnDefs: PropTypes.array,
    tableCols: PropTypes.array,
    handleDeleteClick: PropTypes.func,
    handleEditClick: PropTypes.func,
};

export default Table