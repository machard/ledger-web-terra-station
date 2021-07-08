import LWHwTransport from 'ledger-web-hw-transport'
import client from './client'

const transport = new LWHwTransport(client)
const _send = transport.send
transport.send = async (
  cla: number,
  ins: number,
  p1: number,
  p2: number,
  _data?: Buffer,
  _statusList?: number[]
) => {
  try {
    await client.request('devices', 'requireApp', [
      {
        name: 'Terra',
      },
    ])
  } catch (e) {
    alert('app not accessible')
    throw e
  }
  return _send.call(transport, cla, ins, p1, p2, _data, _statusList)
}

// TODO wrap methods that create interactions

export default transport
