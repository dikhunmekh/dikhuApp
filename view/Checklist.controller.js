sap.ui.controller("view.Checklist", {
	
	onBack: function(){
		
		app.to(page);
		
	},

	onAfterRendering: function() {
		var sUrl = "https://spreadsheets.google.com/feeds/list/1V31iqLrZjtAakX-FztCBh2XWbWTACAdHwr_ohjH8NIY/od6/public/values?alt=json";
		var that = this;
		
		$.getJSON(sUrl, function(data) {
			var aData = data.feed.entry;
			var len = aData.length;
			var oItem, oGroup;
			for(var i=0;i<len;i++)
			{
				oItem = (aData[i].gsx$name.$t).toLowerCase();
				oItem = oItem.trim();
				oGroup = (aData[i].gsx$category.$t).toLowerCase();
				
				if(oItem == "apple")
				{
					that.getView().byId("idChkAppleS").setVisible(true);
					that.getView().byId("idChkApple").setVisible(false);
				}
				if(oItem == "eggs")
				{
					that.getView().byId("idChkEggsS").setVisible(true);
					that.getView().byId("idChkEggs").setVisible(false);
				}
				if(oItem == "milk")
				{
					that.getView().byId("idChkMilkS").setVisible(true);
					that.getView().byId("idChkMilk").setVisible(false);
				}
				if(oItem == "tomato")
				{
					that.getView().byId("idChkTomatoS").setVisible(true);
					that.getView().byId("idChkTomato").setVisible(false);
				}
				if(oItem == "chilly")
				{
					that.getView().byId("idChkChillyS").setVisible(true);
					that.getView().byId("idChkChilly").setVisible(false);
				}
				if(oItem == "curd")
				{
					that.getView().byId("idChkCurdS").setVisible(true);
					that.getView().byId("idChkCurd").setVisible(false);
				}
				if(oItem == "lemon")
				{
					that.getView().byId("idChkLemonS").setVisible(true);
					that.getView().byId("idChkLemon").setVisible(false);
				}
				if(oItem == "cauliflower")
				{
					that.getView().byId("idChkCauliS").setVisible(true);
					that.getView().byId("idChkCauli").setVisible(false);
				}
				if(oItem == "cabbage")
				{
					that.getView().byId("idChkCabbS").setVisible(true);
					that.getView().byId("idChkCabb").setVisible(false);
				}
				if(oItem == "capsicum" || oItem == "capsi" || oItem == 'capsy')
				{
					that.getView().byId("idChkCapsiS").setVisible(true);
					that.getView().byId("idChkCapsi").setVisible(false);
				}
				if(oItem == "brinjal")
				{
					that.getView().byId("idChkBrinjalS").setVisible(true);
					that.getView().byId("idChkBrinjal").setVisible(false);
				}
				if(oItem == "orange" || oItem == 'oranges')
				{
					that.getView().byId("idChkOrangeS").setVisible(true);
					that.getView().byId("idChkOrange").setVisible(false);
				}
				if(oItem == "spinach" || oItem == 'palak' || oItem == 'paleng haak')
				{
					that.getView().byId("idChkSpinachS").setVisible(true);
					that.getView().byId("idChkSpinach").setVisible(false);
				}
				if(oGroup == "soft drinks")
				{
					that.getView().byId("idChkCokeS").setVisible(true);
					that.getView().byId("idChkCoke").setVisible(false);
				}
				if(oItem == "banana")
				{
					that.getView().byId("idChkBananaS").setVisible(true);
					that.getView().byId("idChkBanana").setVisible(false);
				}
				if(oGroup == "frozen")
				{
					that.getView().byId("idChkFfS").setVisible(true);
					that.getView().byId("idChkFf").setVisible(false);
				}
				if(oItem == "fish" || oItem == 'maas')
				{
					that.getView().byId("idChkFishS").setVisible(true);
					that.getView().byId("idChkFish").setVisible(false);
				}
				if(oItem == "cheese")
				{
					that.getView().byId("idChkCheeseS").setVisible(true);
					that.getView().byId("idChkCheese").setVisible(false);
				}
				if(oItem == "bitter gourd" || oItem == 'tita kerela')
				{
					that.getView().byId("idChkBgS").setVisible(true);
					that.getView().byId("idChkBg").setVisible(false);
				}
				if(oGroup == "sweets")
				{
					that.getView().byId("idChkSweetS").setVisible(true);
					that.getView().byId("idChkSweet").setVisible(false);
				}
				if(oGroup == "ice cream")
				{
					that.getView().byId("idChkIceCrmS").setVisible(true);
					that.getView().byId("idChkIceCrm").setVisible(false);
				}
				if(oItem == "chicken")
				{
					that.getView().byId("idChkChknS").setVisible(true);
					that.getView().byId("idChkChkn").setVisible(false);
				}
				if(oItem == "carrot")
				{
					that.getView().byId("idChkCarrotS").setVisible(true);
					that.getView().byId("idChkCarrot").setVisible(false);
				}
				if(oItem == "pumpkin")
				{
					that.getView().byId("idChkPmpknS").setVisible(true);
					that.getView().byId("idChkPmpkn").setVisible(false);
				}
				if(oItem == "mango")
				{
					that.getView().byId("idChkMangoS").setVisible(true);
					that.getView().byId("idChkMango").setVisible(false);
				}
				if(oItem == "beans")
				{
					that.getView().byId("idChkBeanS").setVisible(true);
					that.getView().byId("idChkBean").setVisible(false);
				}
				if(oItem == "butter")
				{
					that.getView().byId("idChkButterS").setVisible(true);
					that.getView().byId("idChkButter").setVisible(false);
				}
				if(oItem == "ghee")
				{
					that.getView().byId("idChkGheeS").setVisible(true);
					that.getView().byId("idChkGhee").setVisible(false);
				}
				if(oItem == "cream")
				{
					that.getView().byId("idChkCreamS").setVisible(true);
					that.getView().byId("idChkCream").setVisible(false);
				}
			}
			
			var oAction="Nothing to buy. All necessary items are available. Please check later.";
			var oActionNeeded="Necessary items not in stock !! Please get the following item/items as soon as possible: "
			var oActionApple = "Apple";
			var oActionEggs = "Eggs";
			var oActionMilk = "Milk";
			var oActionTomato = "Tomato";
			var oActionChilly = "Chilly";
			var oActionCurd = "Curd";
			var oActionLemon = "Lemon";
			
			var oAppleVisible = that.getView().byId("idChkApple").getVisible();
			var oEggsVisible = that.getView().byId("idChkEggs").getVisible();
			var oMilkVisible = that.getView().byId("idChkMilk").getVisible();
			var oTomatoVisible = that.getView().byId("idChkTomato").getVisible();
			var oChillyVisible = that.getView().byId("idChkChilly").getVisible();
			var oCurdVisible = that.getView().byId("idChkCurd").getVisible();
			var oLemonVisible = that.getView().byId("idChkLemon").getVisible();
			
			if(oAppleVisible == true || oEggsVisible == true || oMilkVisible == true || oTomatoVisible == true || oChillyVisible == true || oCurdVisible == true)
				{
					oAction = oActionNeeded;
					if(oAppleVisible == true)
						oAction = oAction + " " + oActionApple + ",";
					if(oEggsVisible == true)
						oAction = oAction + " " + oActionEggs + ",";
					if(oMilkVisible == true)
						oAction = oAction + " " + oActionMilk + ",";
					if(oTomatoVisible == true)
						oAction = oAction + " " + oActionTomato + ",";
					if(oChillyVisible == true)
						oAction = oAction + " " + oActionChilly + ",";
					if(oCurdVisible == true)
						oAction = oAction + " " + oActionCurd + ",";
					if(oLemonVisible == true)
						oAction = oAction + " " + oActionLemon + ",";
					var oActionLen = oAction.length;
					oActionLen = oActionLen - 1;
					oAction = oAction.slice(0,oActionLen);					
				}
			that.getView().byId('idCheckText').setText(oAction);
						
		});
	},
	
	onRefresh: function(){
		
		this.getView().byId('id_SyncCheckL').removeStyleClass('clSyncButton');
		
		var oBusyDialog = new sap.m.BusyDialog({text:"Synchronizing..."});
		oBusyDialog.open();
		
		this.getView().byId("idChkAppleS").setVisible(false);
		this.getView().byId("idChkApple").setVisible(true);
		this.getView().byId("idChkEggsS").setVisible(false);
		this.getView().byId("idChkEggs").setVisible(true);
		this.getView().byId("idChkMilkS").setVisible(false);
		this.getView().byId("idChkMilk").setVisible(true);
		this.getView().byId("idChkTomatoS").setVisible(false);
		this.getView().byId("idChkTomato").setVisible(true);
		this.getView().byId("idChkChillyS").setVisible(false);
		this.getView().byId("idChkChilly").setVisible(true);
		this.getView().byId("idChkCurdS").setVisible(false);
		this.getView().byId("idChkCurd").setVisible(true);
		this.getView().byId("idChkLemonS").setVisible(false);
		this.getView().byId("idChkLemon").setVisible(true);
		this.getView().byId("idChkCauliS").setVisible(false);
		this.getView().byId("idChkCauli").setVisible(true);
		this.getView().byId("idChkCabbS").setVisible(false);
		this.getView().byId("idChkCabb").setVisible(true);
		this.getView().byId("idChkCucumS").setVisible(false);
		this.getView().byId("idChkCucum").setVisible(true);
		this.getView().byId("idChkCapsiS").setVisible(false);
		this.getView().byId("idChkCapsi").setVisible(true);
		this.getView().byId("idChkBrinjalS").setVisible(false);
		this.getView().byId("idChkBrinjal").setVisible(true);
		this.getView().byId("idChkOrangeS").setVisible(false);
		this.getView().byId("idChkOrange").setVisible(true);
		this.getView().byId("idChkSpinachS").setVisible(false);
		this.getView().byId("idChkSpinach").setVisible(true);
		this.getView().byId("idChkCokeS").setVisible(false);
		this.getView().byId("idChkCoke").setVisible(true);
		this.getView().byId("idChkBananaS").setVisible(false);
		this.getView().byId("idChkBanana").setVisible(true);
		this.getView().byId("idChkFfS").setVisible(false);
		this.getView().byId("idChkFf").setVisible(true);
		this.getView().byId("idChkFishS").setVisible(false);
		this.getView().byId("idChkFish").setVisible(true);
		this.getView().byId("idChkCheeseS").setVisible(false);
		this.getView().byId("idChkCheese").setVisible(true);
		this.getView().byId("idChkBgS").setVisible(false);
		this.getView().byId("idChkBg").setVisible(true);
		this.getView().byId("idChkSweetS").setVisible(false);
		this.getView().byId("idChkSweet").setVisible(true);
		this.getView().byId("idChkIceCrmS").setVisible(false);
		this.getView().byId("idChkIceCrm").setVisible(true);
		this.getView().byId("idChkChknS").setVisible(false);
		this.getView().byId("idChkChkn").setVisible(true);
		this.getView().byId("idChkCarrotS").setVisible(false);
		this.getView().byId("idChkCarrot").setVisible(true);
		this.getView().byId("idChkPmpknS").setVisible(false);
		this.getView().byId("idChkPmpkn").setVisible(true);
		this.getView().byId("idChkMangoS").setVisible(false);
		this.getView().byId("idChkMango").setVisible(true);
		this.getView().byId("idChkBeanS").setVisible(false);
		this.getView().byId("idChkBean").setVisible(true);
		this.getView().byId("idChkButterS").setVisible(false);
		this.getView().byId("idChkButter").setVisible(true);
		this.getView().byId("idChkGheeS").setVisible(false);
		this.getView().byId("idChkGhee").setVisible(true);
		this.getView().byId("idChkCreamS").setVisible(false);
		this.getView().byId("idChkCream").setVisible(true);
		
		this.onAfterRendering();
		oBusyDialog.close();
		
	}
	
});