```js
const response = await fetch("http://localhost:3000/api/auth/invite", {
  method: "POST", // or 'PUT'
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ email: "test@email.com" }),
});
```

```bash
curl -F "signature=@/Users/khangal/Downloads/test.pdf" -F "facilityType=3" -F "branchType=2" -F "supplyType=1" -F "buildingType=3" -F "contractDate=2023-09-16T06:33:48.698Z" localhost:3000/api/operation/foo/complete
```
