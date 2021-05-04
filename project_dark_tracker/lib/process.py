import re

import pandas

class Process:
    request = False
    def __init__(self,request):
        self.request=request
        
    def getCat(self,catId):
        cat = pandas.read_csv('data/categories.csv', skiprows=0, error_bad_lines=False)

        categoryList = cat['category']
        categoryId = cat['id']

        for x in range(len(categoryId)):
            if categoryId[x] == catId:
                return categoryList[x]

    def checkPattern(self):
        
        ptn = pandas.read_csv('data/pattern.csv', skiprows = 0, error_bad_lines=False)
        check_null=pandas.notnull(ptn['pattern']);
        ptn=ptn[check_null]
        pattern = ptn['pattern']
        pattern_len=len(pattern)
        category = ptn['category']
        
        resp={}
        i = 0
        
        for value in self.request:
            resp[i]=0
            for x in range(pattern_len):
                chck = re.search(pattern[x],value.lower().strip(), re.IGNORECASE)
                if chck:
                    resp[i]=self.getCat(category[x])
            i = i+1
            
        return {'resp':resp}
        
    def saveList(self):
        item=self.request
        data = pandas.DataFrame([[item['url'], item['count'],item['category']]], columns=['url', 'total_count', 'categories'])
        data.to_csv('data/collection.csv', index=False, na_rep='Unknown', mode = 'a', header = False)
        return {'resp':'saved'}

        