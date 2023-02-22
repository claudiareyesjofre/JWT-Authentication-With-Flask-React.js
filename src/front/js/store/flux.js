const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
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
				const token = sessionStorage.removeItem("token");
				console.log("cierre de seccion")
				setStore({token:null}); 
			}, 
			getinfoRegister: async (user) => {
				fetch(
				  "https://3001-claudiareye-jwtauthenti-vzrzuz8wup4.ws-us87.gitpod.io/signup",
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
