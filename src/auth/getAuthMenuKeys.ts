import semver from 'semver'
import { AuthMenuKey } from '../use-station/src'
import { electron } from '../utils'
import { isElectron, isExtension } from '../utils/env'
import { REQUIRED_ELECTRON_APP_VERSION } from '../wallet/ledger'

export default (): AuthMenuKey[] => {
  if (isElectron) {
    const version: string = electron('version')

    if (semver.lt(version, REQUIRED_ELECTRON_APP_VERSION)) {
      return ['signIn', 'signUp', 'recover']
    }

    return ['signInWithLedger', 'signIn', 'signUp', 'recover', 'importKey']
  } else if (isExtension) {
    return ['signInWithLedger', 'signIn', 'signUp', 'recover', 'importKey']
  }

  return ['signInWithLedger']
}
