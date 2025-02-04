import type { SwitchNetworkData } from '@web3modal/core'
import { OptionsCtrl, RouterCtrl } from '@web3modal/core'
import { html, LitElement } from 'lit'
import { customElement } from 'lit/decorators.js'
import { ThemeUtil } from '../../utils/ThemeUtil'
import styles from './styles.css'

@customElement('w3m-select-network-view')
export class W3mSelectNetworkView extends LitElement {
  public static styles = [ThemeUtil.globalCss, styles]

  // -- private ------------------------------------------------------ //
  private onSelectChain(chain: SwitchNetworkData) {
    const { isConnected, selectedChain } = OptionsCtrl.state
    if (isConnected) {
      if (selectedChain?.id === chain.id) {
        RouterCtrl.replace('Account')
      } else {
        RouterCtrl.push('SwitchNetwork', { SwitchNetwork: chain })
      }
    } else {
      RouterCtrl.push('ConnectWallet')
      OptionsCtrl.setSelectedChain(chain)
    }
  }

  // -- render ------------------------------------------------------- //
  protected render() {
    const { chains } = OptionsCtrl.state

    return html`
      <w3m-modal-header title="Select network"></w3m-modal-header>
      <w3m-modal-content>
        <div class="w3m-grid">
          ${chains?.map(
            chain =>
              html`
                <w3m-network-button
                  name=${chain.name}
                  chainId=${chain.id}
                  .onClick=${() => this.onSelectChain(chain)}
                >
                  ${chain.name}
                </w3m-network-button>
              `
          )}
        </div>
      </w3m-modal-content>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'w3m-select-network-view': W3mSelectNetworkView
  }
}
