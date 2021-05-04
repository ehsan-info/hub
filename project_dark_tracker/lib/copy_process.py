
class Process:
    request = False
    def __init__(self,request):
        self.request=request

    def checkPattern(self):
        resp={}
        i = 0
        for value in self.request:
            if value == 'Only 1 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 2 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 3 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 4 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 5 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 6 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 7 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 8 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 9 left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 10 left at this price on our site':
                resp[i]='misleading'
                
            elif value == 'Only 1 room left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 2 rooms left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 3 rooms left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 4 rooms left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 5 rooms left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 6 rooms left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 7 rooms left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 8 rooms left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 9 rooms left at this price on our site':
                resp[i]='misleading'
            elif value == 'Only 10 rooms left at this price on our site':
                resp[i]='misleading'
                
            #confirmshaming
            elif "no thanks. i'd like to start shopping" in value.lower().strip():
                resp[i]='misdirection' 
            elif "i will pay full price" in value.lower().replace('\r', ' ').replace('\n', ' ').strip():
                resp[i]='misdirection' 
            elif "i’m not interested" in value.lower().strip():
                resp[i]='misdirection'
            
            
            elif value.lower().strip() == 'ending in' :
                resp[i]='urgency'
            elif value.lower().strip() == 'offer ends in':
                resp[i]='urgency'
            elif value.lower().strip() == 'offer expires in':
                resp[i]='urgency'
            elif 'flash deals' in value.lower().strip():
                resp[i]='urgency'
            elif 'flash sale' in value.lower().strip():
                resp[i]='urgency'
            elif 'flash hour' in value.lower().strip():
                resp[i]='urgency'
            elif 'valid from ' in value.lower().strip():
                resp[i]='urgency'
            elif 'limited time only' in value.lower().strip():
                resp[i]='urgency'
            
            elif value.lower().strip() == 'only 1 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 2 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 3 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 4 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 5 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 6 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 7 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 8 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 9 left in stock':
                resp[i]='scarcity'
            elif value.lower().strip() == 'only 10 left in stock':
                resp[i]='scarcity'
            elif 'limited quantities left' in value.lower().strip():
                resp[i]='scarcity'
            
            elif 'get an additional discount' in value.lower().strip():
                resp[i]='misdirection'
            
            #You’re $59.01 away from FREE Shipping!
            elif 'away from free shipping' in value.lower().replace('\r', ' ').replace('\n', ' ').strip():
                resp[i]='pressure selling'
                
            else:
                resp[i]=0
            i = i+1
        return {'resp':resp}