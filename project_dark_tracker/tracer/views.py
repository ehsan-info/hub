from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404

from rest_framework.permissions import AllowAny


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import patterns
from .serializers import patternSerializer

from django.core.serializers import serialize 
from django.http import JsonResponse



from tracer.models import patternCategory


from lib.process import Process


import pandas


def test(request):
    return HttpResponse('Some test text')


# Create your views here.

class tracerList(APIView):
    
    permission_classes = [AllowAny]

    def get(self, request):
        pattern1 = patterns.objects.all()
        serializer = patternSerializer(pattern1, many=True)
        return Response(serializer.data)

    def post(self, request):

        return Response(request.data)


class checkPattern(APIView):

    def post(self, request):
        category = Process(request.data.get('items'))
        response = Response(category.checkPattern())
        return response
    
    def get(self,request):
        return Response(request.data)
        
class saveTrackList(APIView):
    
    def post(self, request):
        savedata = Process(request.data.get('items'))
        response = Response(savedata.saveList())
        return response
    
    def get(self,request):
        return {}


class deleteCategory(APIView):
    
    def post(self,request):
        status_code=0
        form = request.POST
        cat=int(form['index'])
        categoryFile='data/categories.csv'
        collection = pandas.read_csv(categoryFile, skiprows=0, error_bad_lines=False)
        df_new = collection[collection['id'] == cat ]
        
        key_list = list(df_new['id'].keys())
        
        collection.at[key_list[0],'category']=''
        collection.to_csv(categoryFile, encoding='utf-8', index=False)
        status_code=1

        return JsonResponse({
            'status_code':status_code,
            'message':"Successfull!"
        })

    
    def get(self,request):
        return {}


class updateCategory(APIView):
    
    def post(self,request):

        form = request.data
        cat=int(form['index'])
        categoryFile='data/categories.csv'
        collection = pandas.read_csv(categoryFile, skiprows=0, error_bad_lines=False)
        df_new = collection[collection['id'] == cat ]
        
        key_list = list(df_new['id'].keys())
        
        short_desc = str(form['short_desc'])
        
        collection.at[key_list[0],['category','short_desc','link']]=[form['newCat'],short_desc,form['link']]
        collection.to_csv(categoryFile, encoding='utf-8', index=False)

        return JsonResponse({
            'form':form,
            'ok':1,
            'status':'updated'
            
        })

    
    def get(self,request):
        return {}


class addCategory(APIView):
    
    def post(self,request):
        form = request.data
        
        cat = pandas.read_csv('data/categories.csv', skiprows=0, error_bad_lines=False)
        categoryIDs = cat['id']
        last_id=categoryIDs[cat.index[-1]]
        newID = last_id + 1
        short_desc = str(form['desc'])
        data = pandas.DataFrame([[newID,form['category'],short_desc,form['link']]], columns=['id','category','short_desc','link'])
        data.to_csv('data/categories.csv', index=False, na_rep='Unknown', mode = 'a', header = False)
        
        return JsonResponse({'ok':1,'status':'added'})
    
    def get(self,request):
        pass
        

class addPattern(APIView):
    
    def post(self,request):
        form = request.data
        
        pat = pandas.read_csv('data/pattern.csv', skiprows=0, error_bad_lines=False)
        patternIDs = pat['id']
        last_id=patternIDs[pat.index[-1]]
        newID = last_id + 1
        data = pandas.DataFrame([[newID,form['pattern'],form['category']]], columns=['id','pattern','category'])
        data.to_csv('data/pattern.csv', index=False, na_rep='Unknown', mode = 'a', header = False)
        
        return JsonResponse({'ok':1,'status':'added'})
        
        
    def get(self,request):
        pass
    
class deletePattern(APIView):
    
    def post(self,request):
        status_code=0
        form = request.POST
        patID=int(form['index'])
        ptnFile='data/pattern.csv'
        ptnRows = pandas.read_csv(ptnFile, skiprows=0, error_bad_lines=False)
        df_new = ptnRows[ptnRows['id'] == patID ]
        
        key_list = list(df_new['id'].keys())
        

        ptnRows.loc[ptnRows['id'] == patID, ['pattern','category']] = ['','']
        ptnRows.to_csv(ptnFile, encoding='utf-8', index=False)
        status_code=1

        return JsonResponse({
            'status_code':status_code,
            'form':int(form['index']),
            'message':"Successfull!"
        })
        


    
    def get(self,request):
        return {}


class updatePattern(APIView):
    
    def post(self,request):

        status_code=0
        form = request.data
        patID=int(form['index'])
        ptnFile='data/pattern.csv'
        ptnRows = pandas.read_csv(ptnFile, skiprows=0, error_bad_lines=False)
        df_new = ptnRows[ptnRows['id'] == patID ]
        
        key_list = list(df_new['id'].keys())
        

        ptnRows.loc[ptnRows['id'] == patID, ['pattern','category']] = [form['newPat'],form['newCat']]
        ptnRows.to_csv(ptnFile, encoding='utf-8', index=False)
        status_code=1

        return JsonResponse({
            'status_code':status_code,
            # 'form':request.data,
            # 'patID':patID,
            'message':"Successfull!"
        })

    
    def get(self,request):
        return {}