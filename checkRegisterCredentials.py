import sys, json

credentials = sys.argv[1].split(',')
email = credentials[0]
password = credentials[1]
username = credentials[2]
first_name = credentials[3]

successful = False
reason = ""
i = 0

with open('data.json', 'r') as file:
    data = json.load(file)
    if email in data:
        if data[email]["username"] == username:
            i = i + 1
            reason = "Username already in use" + " / i: " + i
        else:
            reason = "Account with this email already exists."
    else:
        with open('data.json', 'w') as file:
            data[email] = {"password":password, "username":username, "first_name":first_name}
            json.dump(data, file, indent=4)
            successful = True
            i = i + 1

return_data = [successful, reason]
print(return_data)
sys.stdout.flush()