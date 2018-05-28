const expect = require("expect");
const { Users } = require("./users");

describe("Users", () => {
  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: 1,
        name: "Mike",
        room: "Node"
      },
      {
        id: 2,
        name: "Jen",
        room: "Node"
      },
      {
        id: 3,
        name: "Mary",
        room: "React"
      }
    ];
  });

  it("should add new user", () => {
    const users = new Users();
    const user = { name: "Eugene", id: 123, room: "Test room" };
    const res = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it("should find user", () => {
    const userId = 2;
    const user = users.getUser(userId);

    expect(user.id).toBe(userId);
  });

  it("should not find user", () => {
    const userId = 55;
    const user = users.getUser(userId);

    expect(user).toBeUndefined();
  });

  it("should delete user", () => {
    const userId = 1;
    const user = users.removeUser(userId);

    expect(user.id).toBe(userId);
    expect(users.users.length).toBe(2);
  });

  it("should not delete user", () => {
    const userId = 55;
    const user = users.removeUser(userId);

    expect(user).toBeUndefined();
    expect(users.users.length).toBe(3);
  });

  it("should return list of user in room", () => {
    const node = "Node";
    const react = "React";

    node_list = users.getUserList(node);
    react_list = users.getUserList(react);
    expect(node_list).toEqual(["Mike", "Jen"]);
    expect(react_list).toEqual(["Mary"]);
  });
});
