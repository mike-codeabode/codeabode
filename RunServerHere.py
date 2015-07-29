import os
import subprocess
import sys
import time

chromePath = "chrome"
if sys.platform == "win32":
	chromePath = os.path.join('C:\\', 'Users', 'Michael', 'AppData', 'Local', 'Google', 'Chrome', 'Application', 'chrome.exe')
else:
	print "Chrome path for {0} is not set in the script".format(sys.platform)

# Use Popen here so that the server is non-blocking
serverPipe = subprocess.Popen(["php", "-S", "0.0.0.0:8000"])
chromePipe = subprocess.Popen([chromePath, "http://127.0.0.1:8000/"])

time.sleep(2) # Quick delay to let the processes start up
raw_input('\nPress enter to kill the server...') # Wait until enter is pressed
serverPipe.kill()
chromePipe.kill()
