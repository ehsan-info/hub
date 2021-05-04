import pandas
# import re

class Process:
    request = False
    def __init__(self,request):
        self.request=request
        
    def getCat(self,catId):
        cat = pandas.read_csv('data/categories.csv', skiprows=0)

        categoryList = cat['category']
        categoryId = cat['id']

        for x in range(len(categoryId)):
            if categoryId[x] == catId:
                return categoryList[x]
    

    def checkPattern(self):
        
        ptn = pandas.read_csv('data/pattern.csv', skiprows = 0)
        pattern = ptn['pattern']
        pattern_len=len(pattern)
        category = ptn['category']
        
        resp={}
        i = 0
        
        for value in self.request:
            resp[i]=0
            for x in range(pattern_len):
                # chck = re.search(pattern[x],testText.lower().strip())
                # if chck:
                #     resp[i]=self.getCat(category[x])
            i = i+1

        return {'resp':resp}


