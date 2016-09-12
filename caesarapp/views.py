
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
import json
import string


# Create your views here.

def index(request):
    return render(request, 'caesarapp/index.html', {})

def cryptSystem(request):
    if request.method == 'POST':
       if request.is_ajax():
          response = json.loads(request.body.decode('utf-8'))
          key = response['key']
          key.encode('utf-8')
          message = response['text']
          message.encode('utf-8')
          cryptType = response['crypt']
          cryptType.encode('utf-8')
          keyInt = int(key)
          translated = ""
          if cryptType == "decrypt":
             keyInt = -keyInt

          for symbol in message:
              if symbol.isalpha():
                 num = ord(symbol)
                 num += keyInt
                 if symbol.isupper():
                    if num > ord('Z'):
                       num -= 26
                    elif num < ord('A'):
                         num += 26
                 elif symbol.islower():
                      if num > ord('z'):
                         num -= 26
                      elif num < ord('a'):
                           num += 26
                 translated += chr(num)
              else:
                 translated += symbol

          convertJson = (json.dumps({'textcrypt': translated}, sort_keys=False, indent=4))

          return HttpResponse(convertJson)

    if request.method == 'GET':
       return render(request, 'caesarapp/encrypt-404.html', {})
