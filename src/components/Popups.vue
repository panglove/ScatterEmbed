<template>
    <section>

        <section class="fader" :class="{'show':showFader}">

            <section class="pop-ins" v-for="popIn in popIns">
                <section class="fullscreen" v-if="isFullscreen(popIn)">
                    <EnterSecurityCode :popin="popIn" v-if="popIn.data.type === popupTypes.SECURITY_CODE" />
                    <ConfirmPassword :popin="popIn" v-if="popIn.data.type === popupTypes.VERIFY_PASSWORD" />
                    <EosProxyVotes :popin="popIn" v-if="popIn.data.type === popupTypes.EOS_PROXY_VOTES" />
                    <EosChangePermissions :popin="popIn" v-if="popIn.data.type === popupTypes.EOS_CHANGE_PERMISSIONS" />
                    <EosModerateRam :popin="popIn" v-if="popIn.data.type === popupTypes.EOS_MODERATE_RAM" />
                    <EosModerateCpuNet :popin="popIn" v-if="popIn.data.type === popupTypes.EOS_MODERATE_CPU_NET" />
                    <EosCreateAccount :popin="popIn" v-if="popIn.data.type === popupTypes.EOS_CREATE_ACCOUNT" />
                    <AddCustomNetwork :popin="popIn" v-if="popIn.data.type === popupTypes.ADD_CUSTOM_NETWORK" />
                    <AddNewContact :popin="popIn" v-if="popIn.data.type === popupTypes.ADD_NEW_CONTACT" />
                    <UnlinkAccount :popin="popIn" v-if="popIn.data.type === popupTypes.UNLINK_ACCOUNT" />
                    <RemoveKeypair :popin="popIn" v-if="popIn.data.type === popupTypes.REMOVE_KEYPAIR" />
                    <ImportKeypair :popin="popIn" v-if="popIn.data.type === popupTypes.IMPORT_KEYPAIR" />
                    <GenerateKeypair :popin="popIn" v-if="popIn.data.type === popupTypes.GENERATE_KEYPAIR" />
                    <CheckHardware :popin="popIn" v-if="popIn.data.type === popupTypes.CHECK_HARDWARE" />
                    <DestroyScatter :popin="popIn" v-if="popIn.data.type === popupTypes.DESTROY_SCATTER" />
                    <ImportBackup :popin="popIn" v-if="popIn.data.type === popupTypes.IMPORT_FULL_BACKUP" />
                    <ExportPrivateKey :popin="popIn" v-if="popIn.data.type === popupTypes.EXPORT_PRIVATE_KEY" />
                    <Terms :popin="popIn" v-if="popIn.data.type === popupTypes.SHOW_TERMS" />
                    <ChangeIdentityKey :popin="popIn" v-if="popIn.data.type === popupTypes.CHANGE_IDENTITY_KEY" />
                </section>
                <section class="overlay" :class="{'wide':isWide(popIn)}" v-else>
                    <figure class="bg-holder">
                        <section class="pop-in-over">
                            <figure class="bg" @click="clickedFader"></figure>
                            <!--<RemoveApp :popin="popIn" v-if="popIn.data.type === popupTypes.REMOVE_APP" />-->
                            <EnterPIN :popin="popIn" v-if="popIn.data.type === popupTypes.ENTER_PIN" />
                            <Prompt :popin="popIn" v-if="popIn.data.type === popupTypes.PROMPT" />
                            <SelectFromList :popin="popIn" v-if="popIn.data.type === popupTypes.SELECT_FROM_LIST" />
                            <TransactionSuccess :popin="popIn" v-if="popIn.data.type === popupTypes.TX_SUCCESS" />
                            <UpdateAvailable :popin="popIn" v-if="popIn.data.type === popupTypes.UPDATE_AVAILABLE" />
                            <SelectAccount :popin="popIn" v-if="popIn.data.type === popupTypes.SELECT_ACCOUNT" />
                            <SelectKeypair :popin="popIn" v-if="popIn.data.type === popupTypes.SELECT_KEYPAIR" />
                            <SelectRecipient :popin="popIn" v-if="popIn.data.type === popupTypes.SELECT_RECIPIENT" />
                            <SelectBlockchain :popin="popIn" v-if="popIn.data.type === popupTypes.SELECT_BLOCKCHAIN" />
                            <SelectToken :popin="popIn" v-if="popIn.data.type === popupTypes.SELECT_TOKEN" />
                            <SelectTokenAndAccount :popin="popIn" v-if="popIn.data.type === popupTypes.SELECT_TOKEN_AND_ACCOUNT" />
                            <ConfirmTransfer :popin="popIn" v-if="popIn.data.type === popupTypes.CONFIRM_TRANSFER" />
                            <ConfirmExchange :popin="popIn" v-if="popIn.data.type === popupTypes.CONFIRM_EXCHANGE" />
                            <EosLinkAccount :popin="popIn" v-if="popIn.data.type === popupTypes.EOS_LINK_ACCOUNT" />
                            <SelectDisplayToken :popin="popIn" v-if="popIn.data.type === popupTypes.DISPLAY_TOKEN" />
                            <EnableSimpleMode :popin="popIn" v-if="popIn.data.type === popupTypes.ENABLE_SIMPLE_MODE" />
                        </section>
                    </figure>
                </section>
            </section>

        </section>


        <section class="snackbar-holder" :class="{'has-snackbar':snackbars.length}">
            <transition-group name="snackbar-transition">
                <Snackbar :popup="popup" v-for="popup in snackbars" :key="popup.id" />
            </transition-group>
        </section>



    </section>
</template>

<script>
    import {RouteNames} from '../vue/Routing'
    import { mapActions, mapGetters, mapState } from 'vuex'
    import {PopupDisplayTypes, PopupTypes, isFullscreen} from '../models/popups/Popup'

    import Snackbar from './popins/overlay/Snackbar.vue'
    import TransactionSuccess from './popins/overlay/TransactionSuccess.vue'

    import EosProxyVotes from './popins/fullscreen/EosProxyVotes'
    import EosChangePermissions from './popins/fullscreen/EosChangePermissions'
    import EosModerateRam from './popins/fullscreen/EosModerateRam'
    import EosModerateCpuNet from './popins/fullscreen/EosModerateCpuNet'
    import ConfirmPassword from '../components/popins/fullscreen/ConfirmPassword'
    import UnlinkAccount from '../components/popins/fullscreen/UnlinkAccount'
    import EosCreateAccount from "./popins/fullscreen/EosCreateAccount";
    import AddCustomNetwork from "./popins/fullscreen/AddCustomNetwork";
    import AddNewContact from "./popins/fullscreen/AddNewContact";
    import ImportKeypair from "./popins/fullscreen/ImportKeypair";
    import GenerateKeypair from "./popins/fullscreen/GenerateKeypair";
    import RemoveKeypair from "./popins/fullscreen/RemoveKeypair";
    import SelectAccount from "./popins/overlay/SelectAccount";
    import SelectKeypair from "./popins/overlay/SelectKeypair";
    import Prompt from "./popins/overlay/Prompt";
    import SelectToken from "./popins/overlay/SelectToken";
    import SelectTokenAndAccount from "./popins/overlay/SelectTokenAndAccount";
    import CheckHardware from "./popins/fullscreen/CheckHardware";
    import DestroyScatter from "./popins/fullscreen/DestroyScatter";
    import ImportBackup from "./popins/fullscreen/ImportBackup";
    import EnableSimpleMode from "./popins/overlay/EnableSimpleMode";
    import ConfirmExchange from "./popins/overlay/ConfirmExchange";
    import ConfirmTransfer from "./popins/overlay/ConfirmTransfer";
    // import DisplayToken from "./popins/fullscreen/DisplayToken";
    import UpdateAvailable from "./popins/overlay/UpdateAvailable";
    import SelectRecipient from "./popins/overlay/SelectRecipient";
    import SelectBlockchain from "./popins/overlay/SelectBlockchain";
    import EnterSecurityCode from "./popins/fullscreen/EnterSecurityCode";
    import SelectFromList from "./popins/overlay/SelectFromList";
    import ExportPrivateKey from "./popins/fullscreen/ExportPrivateKey";
    import EosLinkAccount from "./popins/overlay/EosLinkAccount";
    import SelectDisplayToken from "./popins/overlay/SelectDisplayToken";
    import Terms from "./popins/fullscreen/Terms";
    import ChangeIdentityKey from "./popins/fullscreen/ChangeIdentityKey";
    import EnterPIN from "./popins/overlay/EnterPIN";
    import * as UIActions from "../store/ui_actions";

    export default {
    	components:{
		    EnterPIN,
		    ChangeIdentityKey,
		    Terms,
		    SelectDisplayToken,
		    EosLinkAccount,
		    ExportPrivateKey,
		    SelectFromList,
		    EnterSecurityCode,
		    SelectRecipient,
		    SelectBlockchain,
		    SelectTokenAndAccount,
		    SelectAccount,
		    SelectKeypair,
		    SelectToken,
		    UpdateAvailable,
		    Snackbar,
		    TransactionSuccess,
		    Prompt,
		    ImportBackup,
		    DestroyScatter,
		    // RemoveLocation,
		    AddCustomNetwork,
		    AddNewContact,
		    ConfirmPassword,
		    EosChangePermissions,
		    EosProxyVotes,
		    EosModerateRam,
		    EosModerateCpuNet,
		    EosCreateAccount,
		    UnlinkAccount,
		    RemoveKeypair,
		    ImportKeypair,
		    GenerateKeypair,
		    CheckHardware,
		    ConfirmExchange,
		    ConfirmTransfer,
		    // DisplayToken,
		    EnableSimpleMode,
        },
        data(){ return {
            popupTypes:PopupTypes,
            popupDisplayTypes:PopupDisplayTypes,
        }},
        computed:{
            ...mapState([
                'popups'
            ]),
            ...mapGetters([
                'popIns',
                'nextPopIn',
                'snackbars',
            ]),
            showFader(){
                return this.nextPopIn && this.nextPopIn.displayType === PopupDisplayTypes.POP_IN
            }
        },
        methods:{
	        isFullscreen,
            clickedFader(){
                if(this.nextPopIn) {
                	if(this.nextPopIn.hasOwnProperty('data') && typeof this.nextPopIn.data.callback === 'function') this.nextPopIn.data.callback(null);
                    this[UIActions.RELEASE_POPUP](this.popIns[this.popIns.length - 1]);
                }
            },
	        isWide(popIn){
	        	const wides = [PopupTypes.SELECTOR, PopupTypes.UPDATE_AVAILABLE];
	            return wides.includes(popIn.data.type);
            },
            ...mapActions([
	            UIActions.RELEASE_POPUP
            ])
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    @import "../styles/variables";

    .snackbar-holder {
        position:fixed;
        bottom:0;
        right:0;
        left:0;
        text-align:center;
        z-index:21001;
        pointer-events:none;
        margin:20px;

        &.has-snackbar {
            padding-bottom:40px;
        }
    }

    .fullscreen {
        background:#fff;
        height:calc(100vh - 20px);
        width:100%;
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        display:flex;
        justify-content: center;
        align-items: center;
    }

    .pop-in-over {
        -webkit-app-region: no-drag;

        position:absolute;
        top:10px;
        bottom:10px;
        left:10px;
        right:10px;
        max-width:800px;
        margin:0 auto;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .fader {

        display: flex;
        justify-content: center;
        align-items: center;

        position:fixed;
        top:0;
        bottom:0;
        left:0;
        right:0;
        opacity:0;
        visibility: hidden;

        z-index:10001;

        &.show {
            opacity:1;
            visibility: visible;
        }

        .bg {
            position:fixed;
            top:0;
            bottom:0;
            left:0;
            right:0;
            //background:rgba(255,255,255,0.92);
            background: rgba(3, 25, 49, 0.71);
            z-index: -1;
            cursor: pointer;
        }
    }

</style>
