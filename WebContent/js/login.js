var sHost = "https://my339394.sapbydesign.com";
var sUser;
var sPassword;

$('#btn-connexion').click(function(){
	var sUser = $('#username').val();
	var sPassword = $('#password').val();
	doLogin();
})


var sGetTokenModulePath = sHost + "/sap/ap/ui/login";
var sUrl, sXsrfToken;

function fMain(sXsrfToken) {
  // process app (main,...)
}

function handleLoginResponse(body) {
// If no redirect is needed this code is being executed
  alert("Handle login reps");
  if (!body.login) {
    alert("Login failed");

  } else {
    if (fMain) {
      fMain(); // Remote, login is done using form based login
    }
  }
}

function handleTokenReceived(data, textStatus, XMLHttpRequest) {
  var oResponseParameters = new Object();
  oResponseParameters.sysinfo = new Object();
  sXsrfToken = XMLHttpRequest.getResponseHeader("sap-xsrf"); 
  sURL = sHost;

  // Check if already authenticated
  if (XMLHttpRequest.responseText.indexOf("state=authenticated") === -1) {

    // not authenticated, login
    var xmlDoc = $.parseXML(XMLHttpRequest.responseText);

    $(xmlDoc).find("Data").each(function() {
      $(this).find("Element").each(function() {
        oResponseParameters.sysinfo[$(this).attr("name")] =
        $(this).attr("value");
      });
    });
    var sXsrfToken = oResponseParameters.sysinfo["sap-login-XSRF"];
    $.ajax({
      url: sGetTokenModulePath,
      type: "POST",
      dataType: "json",
      data: {
        "sap-alias": sUser,
        "sap-password": sPassword,
        "sap-login-XSRF": sXsrfToken
      },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("x-sap-request-xsrf", "X");
      },
      success: handleLoginResponse,
      error: function(jqXHR, textStatus, errorThrown) {
        // error callback, also called when response is not in JSON format...
        if (fMain) {
          fMain(sXsrfToken); // Remote, form based login
        }
      }
    });
  } else { // authenticated, call app main
    fMain(sXsrfToken);
  }
}

function doLogin() {
  $.ajax({
    url: sGetTokenModulePath,
    type: "POST",
    beforeSend: function(xhr) {
      xhr.setRequestHeader("x-sap-request-xsrf", "X");
    },
    success: handleTokenReceived,
    error: function(jqXHR, textStatus, errorThrown) {
      alert("Get Login Token call failed");
    }
  });
}