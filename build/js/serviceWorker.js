(()=>{"use strict";function e(e){e?chrome.action.setIcon({path:"../images/icon-16-enabled.png"}):chrome.action.setIcon({path:"../images/icon-16-disabled.png"})}function o(e){switch(e){case"googlevoice":default:return"https://voice.google.com/*";case"textnow":return"https://www.textnow.com/messaging"}}async function t(e){try{const{callFrom:t}=await chrome.storage.local.get("callFrom"),a=await chrome.tabs.query({url:o(t)});a[0]?.id&&chrome.tabs.sendMessage(a[0].id,e)}catch(e){console.log(e)}}chrome.runtime.onInstalled.addListener((async function(){try{const{callFrom:e}=await chrome.storage.local.get("callFrom");if(e)return;chrome.storage.local.set({isEnabled:!1}),chrome.storage.local.set({callFrom:"googlevoice"})}catch(e){console.log(e)}})),chrome.storage.onChanged.addListener((({isEnabled:o},t)=>{e(o.newValue)})),chrome.runtime.onStartup.addListener((()=>{chrome.storage.local.get("isEnabled",(({isEnabled:o})=>{e(o)}))})),chrome.runtime.onMessage.addListener((function(e,o,a){"makeCall"===e.type&&(t(e),"makeCall"===e.type&&t(e))}))})();