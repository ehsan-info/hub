from django.shortcuts import render
from django.http import HttpResponse

from tracer.models import requestCollection

from django.conf import settings
from django.core.files.storage import FileSystemStorage

from lib.forms import noticePatternForm

def create_connection():
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    db_file='db.sqlite3'
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn


def index(request):
    # return HttpResponse('This is home page')
    # return render(request, 'views/test.html', {'foo': 'bar'})
    return render(request, 'views/pages/index.html')

def typesPattern(request):
    return render(request, 'views/pages/types-pattern.html')
def trick(request):
    return render(request, 'views/pages/trick.html')
def forcedContinuity(request):
    return render(request, 'views/pages/forced-continuity.html')
def misdirection(request):
    return render(request, 'views/pages/misdirection.html')
def sneakBasket(request):
    return render(request, 'views/pages/sneak-basket.html')
def priceComparison(request):
    return render(request, 'views/pages/price-comparison.html')
def forceCookies(request):
    return render(request, 'views/pages/force-cookies.html')
def urgencyTiming(request):
    return render(request, 'views/pages/urgency-timing.html')
def confirmShaming(request):
    return render(request, 'views/pages/confirmshaming.html')
def urgencyScarcity(request):
    return render(request, 'views/pages/urgency-scarcity.html')
def hiddenCost(request):
    return render(request, 'views/pages/hidden-cost.html')
def tweetDark(request):
    return render(request, 'views/pages/tweet-pattern.html')

def noticePattern(request):
    # if request.method == 'POST' and request.FILES['patturn_screenshot']:
    if request.method == 'POST':
        status_code=0
        # myfile = request.FILES['patturn_screenshot']
        # fs = FileSystemStorage()
        # filename = fs.save(myfile.name, myfile)
        # uploaded_file_url = fs.url(filename)
        
        # req =  requestCollection(name=request.POST['name'],email=request.POST['email'],source=request.POST['pattern_source'],category_type=request.POST['patturn_type'],image=uploaded_file_url,desc=request.POST['description'])
        # req.save()
        
        form = noticePatternForm(request.POST, request.FILES)
        status='Failed to submit request.'
        if form.is_valid():
            form.save()
            status_code=1
            status='Your request submitted!!!'
        
        return render(request, 'views/pages/notice-pattern.html', {
            'status': status,
            'status_code':status_code,
            'form':form
        })
    else:
        return render(request, 'views/pages/notice-pattern.html')

def aboutUs(request):
    return render(request, 'views/pages/about-us.html')
def ourExtension(request):
    return render(request, 'views/pages/our-extension.html')
    