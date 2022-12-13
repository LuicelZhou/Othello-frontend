import React, { useEffect }  from 'react'
import { Button, Icon, Modal, Table } from 'semantic-ui-react'

const ModalExampleScrollingContent = (props) => {
  const [open, setOpen] = React.useState(false)
  const [history, setHistory] = React.useState({})

  let getHistory = gameId => {
    fetch(`/game_history/${gameId}`)
        .then(response => response.json())
        .then(data => {
            setHistory(data)
        })
  }
  useEffect(() => {
    getHistory(props.gameId)
}, [])

  let organizeHistoryData = history => {
        let organizedData = []
        for (let i = 0; i < history.length; i++) {
            organizedData.push({
                'round': history[i].round,
                'player': history[i].player,
                'move': history[i].move
            })
        }
        return organizedData
  }



  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>View History</Button>}
    >
      <Modal.Header>Game History</Modal.Header>
      <Modal.Content image scrolling>
        

        <Modal.Description>
                  {/* use a table to view the game history */}
                  <Table celled>
                      <Table.Header>
                          <Table.Row>
                              <Table.HeaderCell>Round</Table.HeaderCell>
                              <Table.HeaderCell>Player</Table.HeaderCell>
                              <Table.HeaderCell>Move</Table.HeaderCell>
                          </Table.Row>
                      </Table.Header>
                      <Table.Body>

                          {organizeHistoryData(history).map(data => {
                                return (
                                    <tr>
                                        <td>{data.round}</td>
                                        <td>{data.player}</td>
                                        <td>({data.move[0]}, {data.move[1]})</td>
                                    </tr>
                                )
                          })}
                      </Table.Body>
                  </Table>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} primary>
          Back <Icon name='chevron right' />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ModalExampleScrollingContent