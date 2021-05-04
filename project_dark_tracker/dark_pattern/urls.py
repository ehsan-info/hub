"""dark_pattern URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.conf.urls.static import static 

from django.contrib import admin
from django.urls import path

from django.conf.urls import include


from . import views as main_views


from rest_framework.urlpatterns import format_suffix_patterns
from webapp import views

from tracer import views as tracer_views

# admin.site.site_header = "Login to dark tracker"
# admin.site.site_title = "Welcome Admin"
# admin.site.index_title = "Welcome to dark tracker "

urlpatterns = [

    path('', main_views.index,name="index"),
    
    path('types-pattern/', main_views.typesPattern,name="types-pattern"),
    path('types-pattern/trick', main_views.trick,name="trick"),
    path('types-pattern/forced-continuity', main_views.forcedContinuity,name="forced-continuity"),
    path('types-pattern/misdirection', main_views.misdirection,name="misdirection"),
    path('types-pattern/sneak-basket', main_views.sneakBasket,name="sneak-basket"),
    path('types-pattern/price-comparison', main_views.priceComparison,name="price-comparison"),
    path('types-pattern/force-cookies', main_views.forceCookies,name="force-cookies"),
    path('types-pattern/urgency-timing', main_views.urgencyTiming,name="urgency-timing"),
    path('types-pattern/confirmshaming', main_views.confirmShaming,name="confirmshaming"),
    path('types-pattern/urgency-scarcity', main_views.urgencyScarcity,name="urgency-scarcity"),
    path('types-pattern/hidden-cost', main_views.hiddenCost,name="hidden-cost"),
    path('tweets-dark', main_views.tweetDark,name="tweets-dark"),
    path('notice-pattern/', main_views.noticePattern,name="notice-pattern"),
    path('our-extension', main_views.ourExtension,name="our-extension"),
    path('about-us/', main_views.aboutUs,name="about-us"),
    
    path('admin/tracer/test/', tracer_views.test),

    path('admin/', admin.site.urls),


    # path('employees/', views.employeeList.as_view()),

    # path('tracer/', tracer_views.tracerList.as_view()),
    #
    # path('tracer/check/', tracer_views.checkPattern.as_view())

    path('tracer/', include('tracer.urls')),
    
    
]


if settings.DEBUG:     
     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)