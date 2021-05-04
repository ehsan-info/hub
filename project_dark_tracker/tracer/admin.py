from django.contrib import admin

from django.utils.safestring import mark_safe

# from . models import patterns, requestCollection, collection
from . models import patterns, requestCollection, collection, patternCategory
from django.utils.html import format_html
import pandas


class patternsAdmin(admin.ModelAdmin):

    # A template for a very customized change view:

    change_list_template = 'views/admin/pattern.html'
    
    def getCat(self,catId):
        cat = pandas.read_csv('data/categories.csv', skiprows=0, error_bad_lines=False)

        categoryList = cat['category']
        categoryId = cat['id']

        for x in range(len(categoryId)):
            if categoryId[x] == catId:
                return categoryList[x]
        

    def get_pattern_data(self):
        ptn = pandas.read_csv('data/pattern.csv', skiprows = 0, error_bad_lines=False)
        pattern = ptn['pattern']
        ids = ptn['id']
        pattern_len=len(pattern)
        category = ptn['category']
        resp=[]
        for x in range(pattern_len):
            cat_id = category[x]
            resp.append((ids[x],pattern[x],self.getCat(category[x]),cat_id))
        return resp
    
    def get_category_data(self):
        collection = pandas.read_csv('data/categories.csv', skiprows=0, error_bad_lines=False)

        return collection

    def changelist_view(self, request, extra_context=None):
        my_context = {
            'data': self.get_pattern_data(),
            'catlist':self.get_category_data()
        }

        return super(patternsAdmin, self).changelist_view(request, extra_context=my_context)
# Register your models here.
admin.site.register(patterns,patternsAdmin)

class AdminRequest(admin.ModelAdmin):    
    list_display = ('id_no','preview','source_url','name','email','category','status_check')
    
    def preview(self, obj):
        # ex. the name of column is "image"
        if obj.image:
            return mark_safe('<a href="{0}" target="_blank"><img src="{1}" width="70" height="70" style="object-fit:contain" /></a>'.format(obj.image.url,obj.image.url))
        else:
            return '(No image)'
    
    def source_url(self,obj):
        return mark_safe('<a href="{0}" target="_blank">{1}</a>'.format(obj.source,obj.source[0:50]))
        
    def category(self,obj):
        text='<ul>'
        data=pandas.Series(obj.category_type)
        for x in range(len(data)):
            text = text + "<li>"+data[x]+"</li>"
        text = text + "</ul>"
        return mark_safe(text)

    preview.short_description = 'Preview'
    

    

admin.site.register(requestCollection,AdminRequest)



class collectionAdmin(admin.ModelAdmin):

    # A template for a very customized change view:

    change_list_template = 'views/admin/collection.html'
    

    def get_pattern_data(self):
        collection = pandas.read_csv('data/collection.csv', skiprows=0, error_bad_lines=False)

        return collection

    def changelist_view(self, request, extra_context=None):
        my_context = {
            'data': self.get_pattern_data(),
        }

        return super(collectionAdmin, self).changelist_view(request, extra_context=my_context)
        
admin.site.register(collection,collectionAdmin)



class patternCategoryAdmin(admin.ModelAdmin):

    # A template for a very customized change view:

    change_list_template = 'views/admin/category.html'
    change_form_template = 'views/admin/category_form.html'
    

    def get_category_data(self):
        collection = pandas.read_csv('data/categories.csv', skiprows=0, error_bad_lines=False)

        return collection

    def changelist_view(self, request, extra_context=None):
        my_context = {
            'data': self.get_category_data(),
        }

        return super(patternCategoryAdmin, self).changelist_view(request, extra_context=my_context)
        
admin.site.register(patternCategory,patternCategoryAdmin)





















