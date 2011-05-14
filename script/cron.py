#!/usr/bin/python
# cron trigger for eriji.com

import threading
import time
import urllib

class BackgroundTask(threading.Thread):
    url = 'http://yiriji.com/admin/cron'
    delay = 5

    def __init__(self):
        threading.Thread.__init__(self)
        self.check=True

    def trigger(self):
        response = urllib.urlopen(self.url).read()
        print response

    def run(self):
        while True:
            if not self.check:
                break
            self.trigger()
            time.sleep(self.delay)

def inputToExit(task):
    input = str(raw_input('Enter command : '))
    if input == 'exit':
        task.check = False
        exit()
    else:
        inputToExit(task)

def main():
    task = BackgroundTask()
    task.setDaemon(True)
    task.start()
    print 'Trigger is running in the background. Delay time: ' + str(BackgroundTask.delay)
    inputToExit(task)
    #bg.join() # wait for background task to finish.

main()
print 'The End...'
