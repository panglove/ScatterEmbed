<template>
	<section class="pop-in">
		<section class="head">
			<figure class="icon font icon-attention"></figure>
			<figure class="title">{{$t('destroy.title')}}</figure>
			<section class="disclaimer">
				<figure class="title">{{$t('destroy.disclaimer')}}</figure>
				<figure class="description">{{$t('destroy.description')}}</figure>
			</section>
		</section>

		<ActionBar :buttons-left="[{text:$t('generic.cancel'), click:() => returnResult(false)}]" :buttons-right="[{text:$t('generic.confirm'), blue:true, click:() => destroy()}]" />
	</section>
</template>

<script>
	import { mapActions, mapGetters, mapState } from 'vuex'
	import '../../../styles/popins.scss';
	import SocketService from "@walletpack/core/services/utility/SocketService";
	import StorageService from "../../../services/wallets/StorageService";
	import * as UIActions from "../../../store/ui_actions";

	export default {
		props:['popin'],
		data () {return {

		}},
		created(){

		},
		computed:{
			...mapState([

			]),
			...mapGetters([
				'keypairs',
				'accounts',
			]),
		},
		methods:{
			returnResult(truthy){
				this.popin.data.callback(truthy);
				this[UIActions.RELEASE_POPUP](this.popin);
			},
			async destroy(){
				await SocketService.close();

				setTimeout(async () => {
					await StorageService.removeScatter();
					await window.wallet.lock();
					window.wallet.utility.reload()
				}, 500);
			},

			...mapActions([
				UIActions.RELEASE_POPUP
			])
		},
	}
</script>

<style scoped lang="scss" rel="stylesheet/scss">
	@import "../../../styles/variables";

	.panel-container {
		overflow: auto;
		height: calc(100vh - 240px);
	}

	.auto-vote {
		max-width:600px;
		margin:0 auto;
		display:flex;

		.switch {

		}

		.details {
			padding-left:20px;
		}
	}

	.list {
		max-width:700px;
		width:100%;
		text-align:left;

	}

</style>
