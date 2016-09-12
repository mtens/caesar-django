from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    # Examples:
    # url(r'^$', 'caesar_project.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

     # url(r'^admin/', include(admin.site.urls)),  Admin
     url(r'^$', include('caesarapp.urls')),
     url(r'^api/', include('caesarapp.urls')),
]
