var oView;
var oTimer = 0;
sap.ui.controller("view.Message", {

	onBack: function(){
		
		this.getView().byId('id_SyncMsg').addStyleClass('clSyncButton');
		clearInterval(oTimer);
		oTimer = 0;
			app.to(page);
		
	},
	onAfterRendering: function() {
		
		oView = this;
		this.onRefresh();
				
	},
	
	onRefresh: function(){
		
		oView.getView().byId('id_SyncMsg').removeStyleClass('clSyncButton');
			
		if(oTimer == 0)
			oTimer = setInterval(this.onRefresh, 5000);
			var sUrlMessage = "https://spreadsheets.google.com/feeds/list/1caIhIwFcAc--QcG_hHcF1JdPYFjBwEAoMgYpR5ON5Oc/od6/public/values?alt=json";
			
			$.getJSON(sUrlMessage, function(data) {
				var mData = data.feed.entry;
				mData.reverse();
				if(mData.length > 20)
					mData = mData.slice(0,20);
				var oJsonModelMsg = new sap.ui.model.json.JSONModel(mData);
				oView.getView().setModel(oJsonModelMsg);
			});
			
	},
	
	onNewMessage: function(){

		var that = this;
		if (!that.oDialogNewMsg) {
			that.oDialogNewMsg = new sap.m.Dialog({
				title: "Message Box",
				content: [new sap.m.VBox({
					alignItems: "Center",
					justifyContent: "SpaceAround",
					items: [
						new sap.m.Label({text: "Type your message below"}),
						new sap.m.TextArea({id:"idMsgTxt", rows: 4}),
						
						new sap.m.Label({text: "Select yourself"}),
						new sap.m.Select({
							id: "id_select_identity",
							width: "12em",
							items: [
								new sap.ui.core.Item({
									key: 78,
									text: " "
								}),
								new sap.ui.core.Item({
									key: 51,
									text: "Maa"
								}),
								new sap.ui.core.Item({
									key: 52,
									text: "Majun"
								}),
								new sap.ui.core.Item({
									key: 35,
									text: "Paapa"
								}),
								new sap.ui.core.Item({
									key: 36,
									text: "Baba"
								})
							]
						})
					]
				})],
				beginButton: new sap.m.Button({
					text: 'Post Message',
					type: "Emphasized",
					press: function() {
						
						if(sap.ui.getCore().byId('id_select_identity').getSelectedKey() != 78)
							{
								var oBusyDialog = new sap.m.BusyDialog({text:"Posting..."});
								oBusyDialog.open();
								
									var oMessage = sap.ui.getCore().byId('idMsgTxt').getValue();
									var oAuthor = sap.ui.getCore().byId('id_select_identity').getSelectedItem().mProperties.text;
		
									var oDate = new Date();
									oDate = oDate.toDateString();
									$.ajax({
										url: "https://script.google.com/macros/s/AKfycbz_tr6QGnjVKmQBdjUR_NeUsA85v_P2doOk5ocS4JqLs9bfUphE/exec?author=" + oAuthor + "&message=" + oMessage + "&date=" + oDate +"&id=1caIhIwFcAc--QcG_hHcF1JdPYFjBwEAoMgYpR5ON5Oc",
										type: "POST",
									});											
							
								jQuery.sap.delayedCall(1000, this , function () {
									oBusyDialog.close();
								});
							}
						else
							{
								alert('Select yourself');
							}

					}
				}),
				endButton: new sap.m.Button({
					text: 'Close',
					type: "Reject",
					press: function() {
						that.oDialogNewMsg.close();
						that.onRefresh();
					}
				})

			});

		}
		that.oDialogNewMsg.open();
	},
	
			daysOld : function(oParam) {
				var oToday = new Date();
				var oMonth = oToday.getMonth();
				oToday = oToday.getDate();
				var newDate;
		
				var originalDate = parseInt(oParam.slice(8, 10));
		
				if (originalDate > oToday) {
					if (oMonth === 4 || oMonth === 6 || oMonth === 9 || oMonth === 11) {
						newDate = (30 - originalDate) + oToday;
					} else if (oMonth === 2) {
						newDate = (28 - originalDate) + oToday;
					} else {
						newDate = (31 - originalDate) + oToday;
					}
				} else {
					newDate = oToday - originalDate;
				}
				if (newDate == 0) {
					return "Today";
			}else if (newDate == 1) {
					return "Yesterday";
			} else {
					return newDate + " days old";
			}
		},
		
		authorIcon: function(oParam){
			
			if(oParam == "Maa")
				{
					return "images/maa.JPG";
				}
			if(oParam == "Paapa")
				{
					return "images/paapa.JPG";
				}
			if(oParam == "Majun")
				{
					return "images/majun.JPG";
				}
			if(oParam == "Baba")
				{
					return "images/baba.jpg";
				}
			
		}

});