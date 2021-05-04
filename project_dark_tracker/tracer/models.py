from django.db import models

from multiselectfield import MultiSelectField
from django.shortcuts import render
from django.urls import path

import pandas

import json



from django.template.defaulttags import register

@register.filter
def get_item(dictionary, key):
    return dictionary.get(key)

@register.filter
def set_iterator_custom(object):
    json_parse=json.loads(object)
    list='<ul>'
    for ptn in json_parse:
        list = list+"<li>"+ptn+" :"+str(json_parse[ptn])+"</li>"
    list = list+"</ul>"
    # return list
    return list


@register.filter
def decode_urlencode(encoded_text):
    return encoded_text.decode()

# Create your models here.
class patterns(models.Model):

    ptn_id = models.AutoField(primary_key=True)
    patternField = models.TextField()

    def __str__(self):
        return self.patternField
        # return "some test"
    
    class Meta:
        verbose_name_plural = "Pattern"
    
    # def get_urls(self):
    #     urls = super().get_urls()
    #     my_urls = [
    #         path('patterns/', self.pattern_show),
    #     ]
    #     return my_urls + urls
        
    # def pattern_show(self):
    #     payload = {"form": "form"}
    #     return render(
    #         request, "views/admin/traced.html", payload
    #     )


class requestCollection(models.Model):
    
    id_no=models.AutoField(primary_key=True)
    
    name=models.CharField(max_length=100) 
    email=models.CharField(max_length=100) 
    
    source=models.TextField()  
    
    CHOICES=[('Trick Question','Trick Question'),
         ('Sneak into Basket','Sneak into Basket'),
         ('Forced Continuity','Forced Continuity'),
         ('Misdirection','Misdirection'),
         ('Price Comparison Prevention','Price Comparison Prevention'),
         ('Force Cookies','Force Cookies'),
         ('Urgency','Urgency'),
         ('Confirmshaming','Confirmshaming'),
         ('Hidden costs','Hidden costs')
         ]

    # category_type=models.TextField(choices = CHOICES)
    category_type=MultiSelectField(choices=CHOICES,min_choices=1)
    
    image=models.ImageField(upload_to='images') 
    desc=models.TextField() 
    
    # desc=models.TextField(max_length=255) 
    
    CHOICES_CONFIRMATION=[
        ('Confirmed','Confirmed'),
        ('Rejected','Rejected'),
        ('Pending','Pending')
        ]
    status_check=models.CharField(max_length=100, choices = CHOICES_CONFIRMATION, default='Pending')
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Request Track"
    
    def __str__(self):        
        return 'self.source'
        

# Will be used for pattern and collection show 
class collection(models.Model):
    ptn_id = models.AutoField(primary_key=True)
    url = models.TextField()
    total_count = models.IntegerField()
    categories = models.TextField()
    
    class Meta:
        verbose_name_plural = "Tracked List"


class patternCategory(models.Model):
    cat_id=models.AutoField(primary_key=True)
    category=models.CharField(max_length=100) 
    
    class Meta:
        verbose_name_plural = "Pattern Category"
    
    
    def save(self, commit=False):
        cat = pandas.read_csv('data/categories.csv', skiprows=0, error_bad_lines=False)
        categoryIDs = cat['id']
        last_id=categoryIDs[cat.index[-1]]
        newID = last_id + 1
        
        data = pandas.DataFrame([[newID,self.category]], columns=['id','category'])
        data.to_csv('data/categories.csv', index=False, na_rep='Unknown', mode = 'a', header = False)
        
        # print(self.category)
        
        return False
    
        
        
    
    
    