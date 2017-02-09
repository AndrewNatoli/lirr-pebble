import json
from flask import Flask, request
from trainschedule import *

app = Flask(__name__)

@app.route('/train_schedule/')
def train_schedules():
    try:
        startsta = request.args['startsta']
        endsta = request.args['endsta']
    except Exception:
        return "[]"

    ts = TrainSchedule()
    sched = ts.get(startsta, endsta)
    return json.dumps(sched)




if __name__ == '__main__':
    app.run(host='localhost', port=1337)