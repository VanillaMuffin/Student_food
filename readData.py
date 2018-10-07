file = open("dataRaw.txt","r")

data = file.read()
data = data.split("row restaurant-row")[1:-1]

out = "var allRestaurants = ["


for restaurant in data:
    x = restaurant.split('\n')
    usefulData = []
    i = 0
    restaurantData = []
    for line in x:
        
        
        if("data" in line or "alt" in line):
            i = i +1
            y = line.strip().split("\"")
            if(i==1):
                restaurantData.append(y[1])
                restaurantData.append(y[3])
            elif(i == 2):
                restaurantData.append(y[1])
            elif(i == 3):
                
                restaurantData.append(y[3])
            elif(i == 5):
                
                restaurantData.append(y[1])
                
            elif(i == 6):
                #print(y)
                restaurantData.append(y[1])
                
            elif(i == 7):
                restaurantData.append(y[1])
                
            elif(i == 8):
                restaurantData.append(y[1])
                #print(y)
            elif(i == 10):
                a = 1
                otherAtributtes = []
                for index in range(len(y)-1):
                    #print("     "+y[index])
                    if(y[index].strip() == "alt="):
                        otherAtributtes.append(y[index+1])
                #restaurantData.append(y[1])
                #print(otherAtributtes)
                restaurantData.append(otherAtributtes)

    #print(restaurantData)
    out += str(restaurantData) +","
    #print("-------------------")
out += "];"
#print(out)

file.close()