#importing needed librarys
from os import system
import time
#print options for the user
print ('Running MyMICDS SpeedTest...')
time.sleep(1.2)
print('Connecting...')
time.sleep(1.2)
print('Connected!')
time.sleep(.3)
print('Pinging...')
time.sleep(3)
system("ping mymicds.net")
