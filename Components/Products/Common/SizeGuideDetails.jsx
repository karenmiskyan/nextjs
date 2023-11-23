import React from 'react';
import {SizeColumn, SizeData} from '../../../Data/SizeGuideData';
import DataTables from '../../Element/DataTable';
import {FaFilePdf} from "react-icons/fa6";
import {APICallUrl} from "../../Constant";
import {pdf_api} from "../../Constant";


const SizeGuideDetails = ({downloads}) => {
        return (
            <div className='table-responsive table-pane'>
                {/*<DataTables columns={SizeColumn} data={SizeData} />*/}
                {
                    downloads?.map((el, i) => {

                        if (el.url !== '') {
                            return (
                                <a target="_blank" href={`${pdf_api}/${el?.url}`} style={{color: "black"}}
                                   key={i}>
                                    <div className="download-section">
                                        <FaFilePdf style={{color: "var(--theme-color)"}} size={50}/>
                                        <h4>{el?.label}</h4>
                                    </div>
                                </a>


                            )
                        }

                    })

                }
            </div>
        );
    }
;

export default SizeGuideDetails;
