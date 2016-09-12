function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

//validator for textarea; RegExp: English Alphabet + special chars + numbers
//return json string
//crypt type: "encrypt", "decrypt"
function validTextToJson(text, key, cryptType)
{
  var validator = text.replace(/[^A-Za-z0-9\`~!#@@$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/ -]/g,'');
  var data = {
     key:  key,
     text: validator,
     csrfmiddlewaretoken: '{{csrf_token}}',
     crypt: cryptType
  }
  return JSON.stringify(data);
}

//ajax json for api/cryptsystem
function requestEncrypt(dataJson)
{
  //create csrf token and set options
  var csrftoken = $.cookie('csrftoken');
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});
//value 'data' is result validTextToJson
  $.ajax({
    type:     'POST',
    url:      'api/cryptsystem',
    dataType: 'text',
    data:     dataJson,
    success: function(dataRequest)
    {
      var textCrypt = JSON.parse(dataRequest);
      $('#result').val(textCrypt['textcrypt']);
    }
  });

}


$(function(){
  $('#encrypt-button').click(function(){
      var cryptType = 'encrypt'
      var dataOriginal = $('#encode-decode').val();
      var dataKey = $('#roi-value').val();
      var dataPrepareJson = validTextToJson(dataOriginal, dataKey, cryptType);
      var result = requestEncrypt(dataPrepareJson);
  });
});

$(function(){
  $('#decrypt-button').click(function(){
      var cryptType = "decrypt"
      var dataOriginal = $('#encode-decode').val();
      var dataKey = $('#roi-value').val();
      var dataPrepareJson = validTextToJson(dataOriginal, dataKey, cryptType);
      var result = requestEncrypt(dataPrepareJson);
  });
});
