const { TestWatcher } = require("jest");
const request = require("supertest");

const app = require("../app.js");

// describe("POST /users/signup", () => {
//   test("OK, Registration is succefull", async () => {
//     const res = await request(app).post("/users/signUp").send({
//       fName: "MS",
//       lName: "Dhoni",
//       email: "MSDhoni1@gmail.com",
//       password: "MSDhoni",
//     });
//     console.log(res.error);
//     expect(res.statusCode).toEqual(200);
//   }, 20000);
// });

describe("POST /users/login", () => {
  var token = "";
  var id = "";
  beforeEach(async () => {
    const res = await request(app).post("/users/login").send({
      email: "MSDhoni1@gmail.com",
      password: "MSDhoni",
    });
    console.log(res.error);
    token = res.body.data.token;
    ``;
    id = res.body.data.id;
    console.log(res.body.data);
  }, 20000);
  test("it should login", async () => {
    const res = await request(app).post("/users/login").send({
      email: "MSDhoni1@gmail.com",
      password: "MSDhoni",
    });
    console.log(res.error);
    expect(res.statusCode).toEqual(200);
  }, 20000);
  test("it should get passwords", async () => {
    const res = await request(app)
      .get(`/vault/password/${id}`)
      .set("Authorization", `Barrer ${token}`);
    console.log(res.error);
    expect(res.statusCode).toEqual(200);
  }, 20000);
  test("it should save passwords", async () => {
    const res = await request(app)
      .post(`/vault/savePasswords`)
      .send({
        pName: "Netflix",
        password: "12vff#$^i(065",
        _id: id,
      })
      .set("Authorization", `Barrer ${token}`);
    console.log(res.error);
    expect(res.statusCode).toEqual(200);
  }, 20000);
  test("it should update one password", async () => {
    const res = await request(app)
      .put(`/vault/updatePassword`)
      .send({
        pName: "Netflix",
        password: "12vff#$^i(065",
        _id: "6328049e0d0e1db056729dbf",
      })
      .set("Authorization", `Barrer ${token}`);
    console.log(res.error);
    expect(res.statusCode).toEqual(200);
  }, 20000);
  test("it should delete one password", async () => {
    const res = await request(app)
      .delete(`/vault/delete/6328049e0d0e1db056729dbf`)
      .set("Authorization", `Barrer ${token}`);
    console.log(res.error);
    expect(res.statusCode).toEqual(200);
  }, 20000);
});

// describe("GET /labs/users", () => {
//   test("OK, usersDetails getting done", async () => {
//     const res = await request(app).get("/labs/alldata");

//     console.log(res);
//     expect(res.statusCode).toEqual(200);
//   }, 20000);
// });

// describe("GET /users/edit-users", () => {
//   var token = null;
//   beforeEach((done) => {
//     request(app)
//       .post("/vault/62dd4f09116e577cea003632")
//       .send({
//         email: "Kaveri123@gmail.com",
//         password: "Kaveri123@gmail.com",
//       })
//       .end((err, res) => {
//         token = res.body.data.token;
//         console.log(token);
//         done();
//       });
//   });

//   test("OK, editDetails updated successfully", async () => {
//     const res = await request(app).put("/labs/updateuser").send({
//       fname: "MSD00007",
//       email: "MSDhoni0@gmail.com",
//     });

//     console.log(res);
//     expect(res.statusCode).toEqual(200);
//   });
// });

// describe("GET /samples/samples", () => {
//   test("OK, sampleDetails getting done", async () => {
//     const res = await request(app).get("/reports/viewreports");

//     console.log(res);
//     expect(res.statusCode).toEqual(200);
//   }, 20000);
// });

// addreports;

// describe("GET editreports", () => {
//   test("OK, sampleDetails added", async () => {
//     const res = await request(app)
//       .post("/reports/addreports")
//       .send({
//         _id: "621f71f3516b5d9576f45bfc",
//         date: "12/25/820",
//         sampleId: 12,
//         email: "MSDhoni0@gmail.com",
//         thyroid: [
//           {
//             t3Total: 12,
//             thyroxine: 25,
//             tsh: 12,
//           },
//         ],
//       });

//     console.log(res);
//     expect(res.statusCode).toEqual(200);
//   }, 20000);
// });
