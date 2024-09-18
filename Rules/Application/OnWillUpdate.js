/**
 * Describe this function...
 * @param {IClientAPI} clientAPI
 */
export default function OnWillUpdate(clientAPI) {
    return clientAPI.executeAction('/MDKApp/Actions/Application/OnWillUpdate.action').then((result) => {
        if (result.data) {
            let close_com_sap_edm_sampleservice_v2 = clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v2/Service/CloseOffline.action');
            let close_com_sap_edm_sampleservice_v4 = clientAPI.executeAction('/MDKApp/Actions/com_sap_edm_sampleservice_v4/Service/CloseOffline.action');
            return Promise.all([close_com_sap_edm_sampleservice_v2, close_com_sap_edm_sampleservice_v4]).then(() => {
                Promise.resolve();
            }).catch((err) => {
                Promise.reject('Offline Odata Close Failed ' + err.message);
            });
        } else {
            return Promise.reject('User Deferred');
        }
    });
}