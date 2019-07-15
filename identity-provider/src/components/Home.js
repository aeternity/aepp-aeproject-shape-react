import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Wallet, MemoryAccount } from '@aeternity/aepp-sdk'

export class Home extends Component {

    confirmDialog(method, params, { id }) {
        return Promise.resolve(window.confirm(`User ${ id } wants to run ${ method } ${ params }`))
    }

    isRunningInFrame = () => window.parent !== window

    // created = async () => {
    async created() {

        const { 
            url, 
            internalUrl, 
            compilerUrl, 
            publicKey, 
            privateKey, 
            aeppUrl
        } = this.props;

        this.client = await Wallet({
            url: url,
            internalUrl: internalUrl,
            compilerUrl: compilerUrl,
            accounts: [MemoryAccount({ keypair: { secretKey: privateKey, publicKey: publicKey } })],
            address: publicKey,
            onTx: this.confirmDialog,
            onChain: this.confirmDialog,
            onAccount: this.confirmDialog,
            onContract: this.confirmDialog
        })

        if (!this.isRunningInFrame) this.$refs.aepp.src = aeppUrl
        else window.parent.postMessage({ jsonrpc: '2.0', method: 'ready' }, '*')

        this.height = await this.client.height()
        this.balance = await this.client.balance(this.pub).catch(() => 0)
    }

    componentDidMount() {
        this.created().then(r => {
            // console.log(r)
            // console.log(this.client)
        }).catch(e => {
            console.log(e)
        })
    }

    render() {

        const { 
            publicKey,
            aeppUrl
        } = this.props;

        return (
            <div key="1">
                {!this.isRunningInFrame ? (
                                <div>
                                    <div className="wallet-details">
                                        <h1 className="">Wallet Aepp</h1>
                    
                                        <div className="border">
                                            <div className="">
                                                <div className="">
                                                    <span className="wallet-details-label">Public Key:</span> {publicKey}
                                                </div>
                                            </div>
                                            <div v-if="height" className="">
                                                <div className="p-2 w-1/4">
                                                    <span className="wallet-details-label">Height:</span> 
                                                </div>
                                            </div>
                                            <div v-if="height" className="">
                                                <div className="p-2 w-1/4">
                                                    <span className="wallet-details-label">Balance:</span> 
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                    

                                    {/* <!-- external app --> */}
                                    <iframe title="identity" v-show={aeppUrl} ref="aepp" className="" src="about:blank" frameBorder="1"></iframe>
                                </div>
                ) : (
                    <p>...</p>
                )}

            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return state
}

export default connect(mapStateToPros)(Home)
