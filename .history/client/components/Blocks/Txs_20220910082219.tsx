import React from "react";

const Txs = () => {
    return (
        <Container className="w-100">
        <Responsive>
      <table className={darkMode ? 'w-100 mt-3 dark-mode' : 'w-100 mt-3'}>
        <thead>
          <tr>
            <th>Height</th>
            <th>Hash</th>
            <th>Proposer</th>
            <th>No of Txs</th>
            <th>Time</th>
          </tr>
        </thead>

        {joinedBlocksValidatorsData.map((details) => {
          return details?.map((data) => {
            if (data !== undefined) {
              //console.log(data)
              return (
                <tr>
                  <Link href='/blocks[height]' as={`/blocks/${data.block.height}`} ><a>
                    <td>{data.block?.height ? data.block.height : null}</td> </a></Link>
                  <td>{data.block?.hash ? formatHash(data.block.hash, 15, '....') : null}</td>
                  <Link href='/validators[address]' as={`/validators/${data.validator.operator_address}`} ><a>
                    <td>
                      <img className="img" width={30} src={getValidatorsLogoFromWebsites(data?.validator?.description?.website)} alt="" />
                      <p style={{ display: 'inline', marginLeft: '10px' }}>{data?.validator?.description?.moniker}</p>
                    </td>
                  </a></Link>
                  <td>{data?.block?.noTxs}</td>
                  <td>{data?.block?.time ? toDay(data?.block.time, 'from') : null}</td>
                </tr>
              )
            }
          })
        })
        }
      </table>
    </Responsive>
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >>"
            onPageChange={() => { }}
            pageRangeDisplayed={2}
            pageCount={20}
            previousLabel="<< previous"
            renderOnZeroPageCount={null}
            className="pagination"
          />
        </Container>
    )
}