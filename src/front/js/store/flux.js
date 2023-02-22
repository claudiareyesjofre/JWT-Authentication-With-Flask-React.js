const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			infoRegister: [],
			userInfo: {
				id:'',			
				email: "",
				password: "",				
			  },
			  login: false,
              token: "",
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			logout: () => {
				sessionStorage.removeItem("token");
        		localStorage.removeItem("token");
        		console.log("login out");
        		setStore({
          pokemon: [],
          infoRegister: [],
          userInfo: {
            nombre: "",
            apellido: "",
            email: "",
            password: "",
            telefono: "",
            rut: "",
            rol: null,
          },
          login: false,
          token: "",
        });
        window.location.href = "/";
      },
			login: (email, password) => {
				var myHeaders = new Headers();
				myHeaders.append("Content-Type", "application/json");
				myHeaders.append("Access-Control-Allow-Credentials", "*");
		
				fetch(
				  "https://3001-claudiareye-jwtauthenti-2fdz2b3whkh.ws-us87.gitpod.io/login",
				  {
					method: "POST",
					headers: myHeaders,
					body: JSON.stringify({
					  email: email,
					  password: password,
					}),
					redirect: "follow",
				  }
				)
				  .then((response) => response.json())
				  .then((result) => {
					if (result.status == 200) {
				
					  setStore({
						userInfo: jwt_decode(result.token).sub,
						login: true,
						token: result.token,
					  });
					} else {
					  console.log("result.msg", result.msg);
					}
				  })
				  .catch((error) => console.log("error en login", error));
			  },
			  infoRegister: async (user) => {
				fetch(
				  "https://3001-claudiareye-jwtauthenti-2fdz2b3whkh.ws-us87.gitpod.io/signup",
				  {
					method: "POST",
					headers: {
					  "Content-Type": "application/json",
					},
					body: user,
					redirect: "follow",
				  }
				)
				  .then((response) => response.json())
				  .then((data) => {
					console.log("data", data);
					sessionStorage.setItem("token", data.token);
					if (data.status == 200) {
					  setStore({
						userInfo: jwt_decode(data.token).sub,
						login: true,
						token: data.token,
					  });
					} else if (data.status == 400) {
					  alert(data.msg);
					}
		
					//recibo tokene y debo guardarlo en store, luego desencriptarlo
				  })
				  .catch((error) => console.log("error", error));
			  },
			  tokenValidation: async (ruta) => {
				let token = "";
				let retorno = "/";
				if (typeof localStorage.getItem("token") == "string") {
				  token = localStorage.getItem("token");
				} else if (typeof sessionStorage.getItem("token") == "string") {
				  token = sessionStorage.getItem("token");
				}
		
				if (token !== "") {
				  var myHeaders = new Headers();
				  myHeaders.append("Authorization", `Bearer ${token}`);
				  try {
					await fetch(
					  "https://3001-claudiareye-jwtauthenti-2fdz2b3whkh.ws-us87.gitpod.io/token",
					  {
						method: "POST",
						headers: myHeaders,
						redirect: "follow",
					  }
					)
					  .then((response) => response.json())
					  .then((data) => {
						console.log(data);
						if (data.msg == "token valido") {
						  const user = jwt_decode(token).sub;
						  setStore({
							userInfo: user,
							login: true,
							token: token,
						  });
						  if (user) {
							if ( user)
							  retorno = "/";
							else
							  retorno = "/perfilcliente";
						  } else {
							retorno = "/login";
						  }
						} else {
						  retorno = "/login";
						}
					  });
				  } catch (e) {
					setStore({
					  userInfo: {
						nombre: "",
						apellido: "",
						email: "",
						password: "",
						telefono: "",
						rut: "",
						rol: null,
					  },
					  login: false,
					  token: "",
					});
					localStorage.clear();
					sessionStorage.clear();
		
					if (ruta != "/login") return "/login";
				  }
				} else {
				  if (ruta != "/login") retorno = "/login";
				}
				return retorno;
			  },
			  
			  

			

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
