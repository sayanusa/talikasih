# productclass

# Team Backend

Initial Development Branch

# User API

## REGISTER

---

### Method POST (https://warm-tundra-23736.herokuapp.com/)

### Request Header

> none

### Request Body

> email : <asset_email> <br>password: <asset_password> <br>name: <asset_name><br>

### Response (200)

> "token": "<your_token>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Login

---

### Method POST (https://warm-tundra-23736.herokuapp.com/login)

### Request Header

> none

### Request Body

> email : <asset_email> <br>password: <asset_password>

### Response (200)

> "token": "<your_token>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All User

---

### Method GET (https://warm-tundra-23736.herokuapp.com/allusers)

### Request Header

> "token": "<your_token>"

### Request Body

> none

### Response (200)

> **User Table** <br>"email": "<asset_email>"<br> "password": "<asset_password>" <br> "name": "<asset_name>" <br> "photo": "<asset_photo>"<br>"creditcard": "<asset_creditcard>"<br>"role": "<asset_role>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Delete User

---

### Method DELETE (https://warm-tundra-23736.herokuapp.com/)

### Request Header

> "token": "<your_token>"

### Request Body

> none

### Response (200)

> "msg": "user deleted"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Update User

---

### Method PUT (https://warm-tundra-23736.herokuapp.com/

### Request Header

> "token": "<your_token>"

### Request Body

> "email": "<asset_email>"<br> "password": "<asset_password>" <br> "name": "<asset_name>" <br> "creditcard": "<asset_creditcard>"<br>"role": "<asset_role>"

### Response (200)

> "token": "<your_token>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Update User Image

---

### Method PUT (https://warm-tundra-23736.herokuapp.com/image)

### Request Header

> "token": "<your_token>"

### Request Body

> "photo": "<your_photo>"

### Response (200)

> "token": "<your_token>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## User Add Donation to a Campaign

### POST (https://warm-tundra-23736.herokuapp.com/donate/campaign/:id)

parameters : Campaign id
headers : needed access token

### Body

url-encoded

```
amount  = "type : Float",
share   = "type : Booleans"
comment = "type : String"
```

### Respond (200 - OK)

````
{
    "Success": true,
    "message": "Thank you for donating Rp. 2000 for this campaign",
    "data": {
        "id": "<donation_id>",
        "User_id": "<asset_user_id>",
        "Campaign_id": "<asset_campaign_id>",
        "amount": "<asset_amount>",
        "share": "<asset_condition>",
        "comment": "<asset_comment>",
        "updatedAt": "2020-10-15T08:49:59.655Z",
        "createdAt": "2020-10-15T08:49:59.655Z",
        "date": "<asset_date>"
    }
}
```

### Respond (400 - Bad Request)

````

{
Success : false,
message : "This Campaign's goal has been acheived"
}

```

### Respond (400- Bad Request)

```

{
Success : false,
message : `This Campaign only need Rp. ${expected} more, please use the rest of your money for other Campaigns`
}

```

### Respond (400 - Bad Request)

```

{
Success : false,
message: "Campaign not Found"
}

```

## Get all donated User's logs

### GET (https://warm-tundra-23736.herokuapp.com/donate/campaign)

Headers
need access_token

Body
not needed

Respond (200 - OK)

```

{
"Success": true,
"Result": [
{
"id": "<donation_id>",
"User_id": "<asset_user_id>",
"Campaign_id": "<asset_campaign_id>",
"amount": "<asset_amount>",
"share": "<asset_condition>",
"comment": "<asset_comment>",
"date": "<asset_date>"
"updatedAt": "2020-10-15T08:49:59.655Z",
"createdAt": "2020-10-15T08:49:59.655Z",
}
]

}

```

### Respond (400 - Bad Request)

```

{
Success : false,
message : "Campaign's not found"
}

```
### Respond (401 - Forbidden)
```

{
Success : false,
message : "token not valid"
}

```

```

# Category API

## Get All Category

---

### Method GET (https://warm-tundra-23736.herokuapp.com/category)

### Request Header

> none

### Request Body

> none

### Response (200)

> **Category Table** <br>"name": "<asset_name>"<br> "image": "<asset_image>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Add Category

---

### Method POST (https://warm-tundra-23736.herokuapp.com/category/add)

### Request Header

> "token": "<your_token>"

### Request Body

> "name": "<asset_name>"<br> "image": "<asset_image>" --> FILE PATH

### Response (200)

> "name": "<asset_name>"<br> "image": "<asset_image>"

### Response (409 - Conflict)

> "msg": "<error_msg>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Edit Category

---

### Method PUT (https://warm-tundra-23736.herokuapp.com/category/edit/:id)

### Request Header

> "token": "<your_token>"

### Request Params

> "id": "<category_id>";

### Request Body

> "name": "<asset_name>"<br> "image": "<asset_image>" --> FILE PATH

### Response (200)

> "name": "<asset_name>"<br> "image": "<asset_image>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Delete Category

---

### Method DELETE (https://warm-tundra-23736.herokuapp.com/category/delete/:id)

### Request Header

> "token": "<your_token>"

### Request Params

> "id": "<category_id>";

### Response (200)

> "msg": "<delete_success>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

# Campaign API

## Get All Campaign

---

### Method GET (https://warm-tundra-23736.herokuapp.com/discover/all/:page)

### Request Header

> none

### Request Body

> none

### Request Params

> "page": "<on_page>";

### Response (200)

> **Campaign Table** <br>"on_page": "<on_page>",<br>
    "status": "<success_status>",
    "total_data": "<total_data>",<br>
    "total_pages": "<total_page>",<br>
    "document": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Add Campaign

---

### Method POST (https://warm-tundra-23736.herokuapp.com/campaign/add)

### Request Header

> "token": "<your_token>"

### Request Body

> "title": "<asset_title>"<br> "goal": "<asset_goal>"<br>"story": "<asset_story>"<br> "due_date": "<asset_due_date>"<br>"header_image": "<asset_header_image>" --> FILE PATH<br> "CategoryId": "<asset_CategoryId>"<br>
### Response (200)

>"status": "<success_status>",<br> "point": "<asset_point>"<br>"id": "<asset_id>",<br>"title": "<asset_title>"<br> "goal": "<asset_goal>"<br>"story": "<asset_story>"<br> "due_date": "<asset_due_date>"<br>"header_image": "<asset_header_image>"<br> "CategoryId": "<asset_CategoryId>"<br>"raised": "<asset_raised>"<br>"UserId": "<asset_UserId>",<br>

### Response (409 - Conflict)

> "msg": "<error_msg>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get Campaign by Id

---

### Method GET (https://warm-tundra-23736.herokuapp.com/campaign/:id)

### Request Header

> "token": "<your_token>"

### Request Params

> "id" : "<asset_id>"

### Request Body

> none

### Response (200)

>"status": "<success_status>",<br> "point": "<asset_point>"<br>"id": "<asset_id>",<br>"title": "<asset_title>"<br> "goal": "<asset_goal>"<br>"story": "<asset_story>"<br> "due_date": "<asset_due_date>"<br>"header_image": "<asset_header_image>"<br> "CategoryId": "<asset_CategoryId>"<br>"raised": "<asset_raised>"<br>"UserId": "<asset_UserId>",<br> **Users Details** <br> **Categories Details**

### Response (409 - Conflict)

> "msg": "<error_msg>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Edit Campaign

---

### Method PUT (https://warm-tundra-23736.herokuapp.com/campaign/edit/:id)

### Request Header

> "token": "<your_token>"

### Request Params

> "id": "<campaign_id>";

### Request Body

> "title": "<asset_title>"<br> "goal": "<asset_goal>"<br>"story": "<asset_story>"<br> "due_date": "<asset_due_date>"<br> "CategoryId": "<asset_CategoryId>"

### Response (200)

>"status": "<success_status>",<br> "point": "<asset_point>"<br>"id": "<asset_id>",<br>"title": "<asset_title>"<br> "goal": "<asset_goal>"<br>"story": "<asset_story>"<br> "due_date": "<asset_due_date>"<br>"header_image": "<asset_header_image>"<br> "CategoryId": "<asset_CategoryId>"<br>"raised": "<asset_raised>"<br>"UserId": "<asset_UserId>",<br>

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Edit Image Campaign

---

### Method PUT (https://warm-tundra-23736.herokuapp.com/campaign/edit/image/:id)

### Request Header

> "token": "<your_token>"

### Request Params

> "id": "<campaign_id>";

### Request Body

> "header_image": "<asset_header_image>" --> FILE PATH

### Response (200)

> "header_image": "<asset_header_image>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Delete Campaign

---

### Method DELETE (https://warm-tundra-23736.herokuapp.com/campaign/delete/:id)

### Request Header

> "token": "<your_token>"

### Request Params

> "id": "<campaign_id>";

### Response (200)

> "msg": "<delete_success>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by Category

---

### Method GET (https://warm-tundra-23736.herokuapp.com/discover/category/:CategoryId/:page)

### Request Header

> none

### Request Params

> "CategoryId": "<category_id>";<br>
> "page": "<on_page>";

### Response (200)

> **Campaign Table**"status": "<success_status>", <br>"on_page": "<on_page>",<br>
    "total_data": "<total_data>",<br>
    "total_pages": "<total_page>",<br>
    "document": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by Search

---

### Method GET (https://warm-tundra-23736.herokuapp.com/discover/search)

### Request Header

> none

### Request Query Params

> "page": "<on_page>";<br>
> "search": "<search_keyword>";<br>

### Request Body

### Response (200)

> **Campaign Table** <br>"status": "<success_status>",<br>"on_page": "<on_page>",<br>
    "total_data": "<total_data>",<br>
    "total_pages": "<total_page>",<br>
    "document": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by Raised

---

### Method GET (https://warm-tundra-23736.herokuapp.com/campaign/raised)

### Request Header

> none

### Request Params

> none

### Request Body

> none

### Response (200)

> **Campaign Table** <br>"Status": "<status_info>",<br>
    "Success": "<success_info>",<br>
    "Result": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by Popularity

---

### Method GET (https://warm-tundra-23736.herokuapp.com/campaign/popular/:page)

### Request Header

> none

### Request Params

> "page": "<on_page>";

### Request Body

> none

### Response (200)

> **Campaign Table** <br>"Status": "<status_info>",<br>
    "Success": "<success_info>",<br>
    "on_page": "<on_page>",<br>
    "total_data": "<total_data>",<br>
    "total_pages": "<total_page>",<br>
    "ranked": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by Urgent

---

### Method GET (https://warm-tundra-23736.herokuapp.com/campaign/urgent/:page)

### Request Header

> none

### Request Params

> "page": "<on_page>";

### Request Body

> none

### Response (200)

> **Campaign Table** <br>
"status": "<success_status>",<br>
    "on_page": "<on_page>",<br>
    "total_data": "<total_data>",<br>
    "total_pages": "<total_page>",<br>
    "ranked": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by Search Sort Popular

---

### Method GET (https://warm-tundra-23736.herokuapp.com/discover/search)

### Request Header

> none

### Request Query Params

> "page": "<on_page>";<br>
> "filter": "<filter_of>"; // isi: popular <br> 
> "search": "<search_keyword>";<br>

### Request Body

> none

### Response (200)

> **Campaign Table** <br>
"status": "<success_status>",<br>
    "on_page": "<on_page>",<br>
    "total_data": "<total_data>",<br>
    "total_pages": "<total_page>",<br>
    "ranked": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by Search Sort Less Donation

---

### Method GET (https://warm-tundra-23736.herokuapp.com/discover/search)

### Request Header

> none

### Request Query Params

> "page": "<on_page>";<br>
> "filter": "<filter_of>"; // isi: less <br> 
> "search": "<search_keyword>";<br>

### Request Body

> none

### Response (200)

> **Campaign Table** <br>
"status": "<success_status>",<br>
    "on_page": "<on_page>",<br>
    "total_data": "<total_data>",<br>
    "total_pages": "<total_page>",<br>
    "ranked": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by Search Sort Urgent

---

### Method GET (https://warm-tundra-23736.herokuapp.com/discover/search)

### Request Header

> none

### Request Query Params

> "page": "<on_page>";<br>
> "filter": "<filter_of>"; // isi: urgent <br> 
> "search": "<search_keyword>";<br>

### Request Body

> none

### Response (200)

> **Campaign Table** <br>
"status": "<success_status>",<br>
    "on_page": "<on_page>",<br>
    "total_data": "<total_data>",<br>
    "total_pages": "<total_page>",<br>
    "ranked": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## GET /campaign/categoryPopular/:CategoryId/:page

```
Get campaign by categoryId sort by most popular (12 campaign/page)
-Request Header:
not needed
-Request Body:
not needed
-Response(200 - OK){
    "id": "",
    "title": "",
    "goal": "",
    "raised": "",
    "header_img": "",
    "story": "",
    "due_date": "",
    "UserId": "",
    "CategoryId": "",
    "bankAccount": "",
    "point": "",
    "createdAt": "",
    "updatedAt": "",
        "Category": {
            "name": "",
            "image": ""
}
```

## GET /campaign/categoryUrgent/:CategoryId/:page

```
Get campaign by categoryId sort by most urgent (12 campaign/page)
-Request Header:
not needed
-Request Body:
not needed
-Response(200 - OK){
    "id": "",
    "title": "",
    "goal": "",
    "raised": "",
    "header_img": "",
    "story": "",
    "due_date": "",
    "UserId": "",
    "CategoryId": "",
    "bankAccount": "",
    "point": "",
    "createdAt": "",
    "updatedAt": "",
        "Category": {
            "name": "",
            "image": ""
}
```

## GET /campaign/categoryLess/:CategoryId/:page

```
Get campaign by categoryId sort by less donation (12 campaign/page)
-Request Header:
not needed
-Request Body:
not needed
-Response(200 - OK){
    "id": "",
    "title": "",
    "goal": "",
    "raised": "",
    "header_img": "",
    "story": "",
    "due_date": "",
    "UserId": "",
    "CategoryId": "",
    "bankAccount": "",
    "point": "",
    "createdAt": "",
    "updatedAt": "",
        "Category": {
            "name": "",
            "image": ""
}
```
## Get Related Champaign

---

### Method GET (https://warm-tundra-23736.herokuapp.com/relate/:CategoryId/:id)

### Request Header

> none

### Request Params

> "CategoryId": "<Category_Id>";<br>
> "id": "<Campaign_Id>";

### Request Body

> none

### Response (200)

> **Campaign Table** <br>
"status": "<success_status>",<br>
    "found": [<br>
        {<br>
            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>


# Campaign Log API

## GET /campaignLog/:CampaignId/:page

```
- Request Header:
not needed
-Request Body:
not needed
-Respone(200){
    total_page:"",
    Campaign_Logs:[
        {
            "id": 1,
            "UserId": 1,
            "CampaignId": 1,
            "StatusId": 1,
            "content": "Pay for operation update user",
            "date": "2020-10-16T00:00:00.000Z",
            "ammount": null,
            "createdAt": "2020-10-15T17:54:46.718Z",
            "updatedAt": "2020-10-17T10:50:32.084Z",
            include : Campaign, User
        }
    ]
}
```

## GET /campaignLog/desc/:CampaignId/:page

```
- Request Header:
not needed
-Request Body:
not needed
-Respone(200){
    total_page:"",
    Campaign_Logs:[
        {
            "id": 1,
            "UserId": 1,
            "CampaignId": 1,
            "StatusId": 1,
            "content": "Pay for operation update user",
            "date": "2020-10-16T00:00:00.000Z",
            "ammount": null,
            "createdAt": "2020-10-15T17:54:46.718Z",
            "updatedAt": "2020-10-17T10:50:32.084Z",
            include : Campaign, User
        }
    ]
}
```

## POST /campaignLog/:CampaignId

```
-Request Header:
{token}
-Request Body:{
    "UserId":"",
    "StatusId":"",
    "content":"",
    "date":"",
    "ammount":""
}
```

```
if (Campaigns.raised < (CampaignLog.TotalAmmount + ammount)){
    Response(404 - "Not enough raised donation to withdrawal for this campaign")
```

```
} else {
    Response(201 - created){
        "id":"",
        "UserId":"",
        "CampaignId":"",
        "StatusId":"",
        "content":"",
        "date":"",
        "ammount":""
    }
}
```

## PUT /campaignLog/:id

```
-Request Header:
{token}
-Request Body:{
    "UserId":"",
    "StatusId":"",
    "content":"",
    "date":"",
    "ammount":""
}
-Response(201 - created){
        "id":"",
        "UserId":"",
        "CampaignId":"",
        "StatusId":"",
        "content":"",
        "date":"",
        "ammount":""
    }
```

## DELETE /campaignLog/:id

```
-Request Header:
{token}
-Request Body:
not needed
-Response (200 - "Status campaign deleted")
```

# Comment API

## GET /comment/:CampaignId/:page

```
- Request Header:
not needed
-Request Body:
not needed
-Respone(200){
    total_page:"",
    comments: {
        "UserId":"",
        "CampaignId":"",
        "content":"",
        "date":""
    },
    Users: "name" : ""
           "photo" : ""
}
```

## GET /comment/:CampaignId

```
- Request Header:
not needed
-Request Body:
not needed
-Respone(200){
    comments: {
        "UserId":"",
        "CampaignId":"",
        "content":"",
        "date":""
    },
    Users: "name" : ""
           "photo" : ""
}
```

## POST /comment/add/:id

```
add coment using CampaignId
-Request Header:
{token}
-Request Body:{
    "UserId":"",
    "CampaignId":"",
    "content":"",
    "date":""
}
-Response (201-created){
    "UserId":"",
    "CampaignId":"",
    "content":"",
    "date":""
}
```

## PUT /comment/:id

```
edit existed comment using CommentId
-Request Header:
{token}
    -Request Body:{
    "UserId":"",
    "CampaignId":"",
    "content":"",
    "date":""
}
-Response (201-created){
     "UserId":"",
    "CampaignId":"",
    "content":"",
    "date":""
}
```

## DELETE /comment/:id

```
delete existed comment using CommentId
-Request Header:
{token}
-Request Body:
not needed
-Response (200 - "Comment deleted")
```

## Get All Campaign by Campaign Id

---

### Method GET (https://warm-tundra-23736.herokuapp.com/campaign/:id)

### Request Header

> none

### Request Params

> "id": "<Campaign_Id>";

### Request Body

> none

### Response (200)

> **Campaign Table** <br>

            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "User": <br>
                "name": "<asset_name>",<br>
                "photo": "<asset_photo>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get Trending

---

### Method GET (https://warm-tundra-23736.herokuapp.com/discover/trending)

### Request Header

> none

### Request Params

> none

### Request Body

> none

### Response (200)

> **Campaign Table** <br>

            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "User": <br>
                "name": "<asset_name>",<br>
                "photo": "<asset_photo>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## Get All Campaign by UserId

---

### Method GET (https://warm-tundra-23736.herokuapp.com/campaign/user)

### Request Header

> "token": "<your_token>"

### Request Params

> none

### Request Body

> none

### Response (200)

> **Campaign Table** <br>

            "id": "<asset_id>",<br>
            "title": "<asset_title>",<br>
            "goal": "<asset_goal>",<br>
            "raised": "<asset_raised>",<br>
            "header_img": "<asset_header_img>",<br>
            "story": "<asset_story>",<br>
            "due_date": "<asset_due_date>",<br>
            "UserId": "<asset_UserId>",<br>
            "CategoryId": "<asset_CategoryId>",<br>
            "bankAccount": "<asset_bankAccount>",<br>
            "point": "<asset_point>",<br>
            "createdAt": "<asset_createdAt>",<br>
            "updatedAt": "<asset_updatedAt>",<br>
            "Category": {<br>
                "name": "<asset_name>",<br>
                "image": "<asset_image>"<br>
            }<br>
        }

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

# LATEST UPDATE

## GET APPROVED CAMPAIGNS

---

### Method GET (https://warm-tundra-23736.herokuapp.com/discover/approved)

### Request Header

> none

### Request Body

> none

### Response (200)

> "id": "<asset_id>",<br>
> "title": "<asset_title>",<br>
> "goal": "<asset_goal>",<br>
> "raised": "<asset_raised>",<br>
> "header_img": "<asset_header_img>",<br>
> "story": "<asset_story>",<br>
> "due_date": "<asset_due_date>",<br> "UserId": "<asset_UserId>",<br> "CategoryId": "<asset_CategoryId>",<br> "bankAccount": "<asset_bankAccount>",<br> "point": "<asset_point>",<br> "createdAt": "<asset_createdAt>",<br> "updatedAt": "<asset_updatedAt>",<br> "Category": {<br>

            "name": "<asset_name>",<br>
            "image": "<asset_image>"<br>
        }<br>

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## PUT APPROVE CAMPAIGN

---

### Method PUT (https://warm-tundra-23736.herokuapp.com/discover/approve/:id)

### Request Header

> none

### Request Params

> "id": "<Campaign_Id>";

### Request Body

> none

### Response (200)

> "id": "<asset_id>",<br>
> "title": "<asset_title>",<br>
> "goal": "<asset_goal>",<br>
> "raised": "<asset_raised>",<br>
> "header_img": "<asset_header_img>",<br>
> "story": "<asset_story>",<br>
> "due_date": "<asset_due_date>",<br>
> "UserId": "<asset_UserId>",<br>
> "CategoryId": "<asset_CategoryId>",<br>
> "StatId": "<asset_StatId>",<br>
> "bankAccount": "<asset_bankAccount>",<br>
> "point": "<asset_point>",<br>
> "createdAt": "<asset_createdAt>",<br>
> "updatedAt": "<asset_updatedAt>",<br>

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---
<br>

### Method POST /donate/payment/:id
### Request Header
> "token": "<your_token>"
### Request Params
> campaign id
### Request Body
### type : form-url-encoded
> "comment": "<type : string>",<br>
> "amount" : <type : integer>,<br>
> "currency" : <type : string>,<br>
> "card_number":<type : integer (16 digits)><br>
> "exp_date": "<type:integer (2 digits)>"<br>
> "exp_month": <type:integer (2 digits)><br>
> "exp_year": <type:integer (2 digits)><br>
> "cvv" : <type : integer (2 digits)><br>
> "share": <type : boolean><br>

### Response (200)
```
{
    "Success": true,
    "message": "Thank you for donating USD 20 for this campaign",
    "data": {
        "id": 46,
        "UserId": 2,
        "CampaignId": 2,
        "amount": 20,
        "share": false,
        "comment": "wonderfull, nice",
        "receipt": "https://pay.stripe.com/receipts/acct_1HdIKGFP7bRXk6v3/ch_1HgCnkFP7bRXk6v3dobysNar/rcpt_IGkIgQOqgpSNcEyronWXRwa6PTa9vc1",
        "updatedAt": "2020-10-25T17:14:40.844Z",
        "createdAt": "2020-10-25T17:14:40.844Z",
        "date": null
    }
```

<br>

## PUT REJECT CAMPAIGN

---

### Method PUT (https://warm-tundra-23736.herokuapp.com/discover/reject/:id)

### Request Header

> none

### Request Params

> "id": "<Campaign_Id>";

### Request Body

> none

### Response (200)

> "id": "<asset_id>",<br>
> "title": "<asset_title>",<br>
> "goal": "<asset_goal>",<br>
> "raised": "<asset_raised>",<br>
> "header_img": "<asset_header_img>",<br>
> "story": "<asset_story>",<br>
> "due_date": "<asset_due_date>",<br>
> "UserId": "<asset_UserId>",<br>
> "CategoryId": "<asset_CategoryId>",<br>
> "StatId": "<asset_StatId>",<br>
> "bankAccount": "<asset_bankAccount>",<br>
> "point": "<asset_point>",<br>
> "createdAt": "<asset_createdAt>",<br>
> "updatedAt": "<asset_updatedAt>",<br>

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

## GET GOOGLE SIGN IN

---

### Method PUT (https://warm-tundra-23736.herokuapp.com/google)

### Request Header

> none

### Request Body

> none

### Response (200)

> "token": "<your_token>"

### Response (400 - Bad Request)

> "msg": "<error_msg>"

---

<br>

### Method POST (https://warm-tundra-23736.herokuapp.com/donate/midtran/{campaign_id})

### Request Headers

> "token": "<your_token>"


### Request Body

> 'card_number': '4811111111111114',
> 'card_exp_month': '12',
> 'card_exp_year': '24',
> 'card_cvv': '123',
> 'amount': '1500' 

### Response (201)

> "status_code": "201",
> "status_message": "Success, Credit Card transaction is successful",
> "bank": "mandiri",
> "transaction_id": "19edcb3e-80a7-49af-8002-36532f05f327",
> "order_id": "4-19edcb3e-80121328",
> "redirect_url": "https://api.sandbox.veritrans.co.id/v2/token/rba/redirect481111-1114-19edcb3e-80a7-49af-8002-36532f05f327",
> "merchant_id": "G216144116",
> "gross_amount": "1500.00",
> "currency": "IDR",
> "payment_type": "credit_card",
> "transaction_time": "2020-11-02 12:13:29",
> "transaction_status": "pending",
> "fraud_status": "accept",
> "masked_card": "481111-1114",
> "card_type": "credit"

--- 

<br>
