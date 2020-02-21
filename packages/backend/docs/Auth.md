# HubLaw

## Authentication Strategy

### Basic Information
This project is a multi-tenant SAAS with the following guidelines:
- An **User** can create one or more **Lawfirm**
- The **User** who created the **Lawfirm** is its *owner* (1:1 Relationship)
- The **User** who created the **Lawfirm** is also a *LawfirmUser* (n:n Relationship)
- The **Lawfirm** *owner* can create a new **User** that will be a *LawfirmUser* (n:n Relationship)

### Other

### SignUp & SignIn Flow
1) Anyone create an **User** (*name, email, password*) for himself;
2) User signIn with credentials (*email, password*);
3) E-mail validation: *feature to be implemented*
4) User receives an *JWT Token*;
5) User create a **Lawfirm** and gets all his *Lawfirms* as response;
6) **User** select a **Lawfirm**
7) User receives a *JWT Token* that contains his *user.id* and his selected *lawfirm.id*

** The **Lawfirm.owner** owner can add **User** to his Lawfirm. If the **User** doesn't exist it should be created and the **User** will receive an generated password on his e-mail;

** If the **User** already exists when the **Lawfirm.owner** try to add a new *User* to the *Lawfirm*, only the relationship will be created and the 'new' **User** will get an e-mail informing that he is now part of the **Lawfirm**;

### Authentication Flow
1) signIn: [**api/users/signin**](#)

        Request on route passing 'email' and 'password' on JSON body.
        Backend will fetch user with the provided e-mail address.
        If there is an User, will checkPassword
        If password is valid, should return a JWT Token


2) selectLawfirm: [**api/users/lawfirms/select**](#)

3) lkajsdlas
3) asasdas


## Resources
- Clients
- Documents
- Meetings
- Contract
- Lawsuit

- Court Hearing
- Intimation
- Tasks
- Events

**Parte Financeira**

### Relationships
#### App Relationships
[User] as *owner* [Lawfirm] => 1:1
[User] as *LawfirmUser* [Lawfirm] => n:n
[Lawfirm] as *lawfirm* [Resources] => 1:1
#### Resources Relationships
**Client** hasMany **Lawsuit** && **Lawsuit** belongsToMany **Client**
**Lawsuit** hasMany **Task** && **Task** belongsTo **Lawsuit**
**User** hasMany **Task** && **Task** belongsTo **User**

[Client] [Lawsuit]
[Lawsuit] [Task]
[Task] [User]
