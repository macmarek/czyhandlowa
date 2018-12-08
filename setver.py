import random
rnd = random.randint(0,10000)
ver = str(rnd)

FileName = "./index.html"

with open(FileName) as f:
    newText=f.read().replace('[ver]', ver)
 
with open(FileName, "w") as f:
    f.write(newText)