import json

with open("e:/arabianstorebd/arabian-store-api/postman/Arabian_Store_API.postman_collection.json", "r", encoding="utf-8-sig") as f:
    data = json.load(f)

# 1. Find Customers folder and add Delete Customer
for item in data['item']:
    if item['name'] == 'Customers':
        # Check if Delete Customer is already there
        exists = any(i['name'] == 'Delete Customer' for i in item['item'])
        if not exists:
            item['item'].append({
                "name": "Delete Customer",
                "request": {
                    "method": "DELETE",
                    "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
                    "url": {
                        "raw": "{{base_url}}/customers/:phone",
                        "host": ["{{base_url}}"],
                        "path": ["customers", ":phone"],
                        "variable": [{"key": "phone", "value": "01700000000"}]
                    },
                    "description": "Delete a customer and all their associated orders."
                }
            })

# 2. Add Notifications folder if it doesn't exist
exists = any(i['name'] == 'Notifications' for i in data['item'])
if not exists:
    data['item'].append({
        "name": "Notifications",
        "item": [
            {
                "name": "Get Unread Notifications",
                "request": {
                    "method": "GET",
                    "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
                    "url": {
                        "raw": "{{base_url}}/notifications",
                        "host": ["{{base_url}}"],
                        "path": ["notifications"]
                    },
                    "description": "Retrieve a list of all unread notifications."
                }
            },
            {
                "name": "Mark All As Read",
                "request": {
                    "method": "PATCH",
                    "header": [{"key": "Authorization", "value": "Bearer {{token}}"}],
                    "url": {
                        "raw": "{{base_url}}/notifications/mark-all-read",
                        "host": ["{{base_url}}"],
                        "path": ["notifications", "mark-all-read"]
                    },
                    "description": "Mark all unread notifications as read."
                }
            }
        ]
    })

with open("e:/arabianstorebd/arabian-store-api/postman/Arabian_Store_API.postman_collection.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2)

print("Updated collection successfully.")
