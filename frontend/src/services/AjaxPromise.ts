class AjaxPromise {
  constructor(type: string, url: string, data: any) {}

  public get(): Promise<any> {
    // return new Promise(function (resolve, reject) {
    //     $.ajax(url, {
    //         data: data ? JSON.stringify(data) : null,
    //         contentType: 'application/json',
    //         headers: { "Content-Type": "application/json" },
    //         type: type,
    //         success: function (data) {
    //             resolve(data);
    //         },
    //         error: function (jqXHR, textStatus, errorThrown) {
    //             console.log("ajax error", textStatus, errorThrown, jqXHR)
    //             reject(errorThrown)
    //         },
    //     });
    // })
    return Promise.reject();
  }
}
