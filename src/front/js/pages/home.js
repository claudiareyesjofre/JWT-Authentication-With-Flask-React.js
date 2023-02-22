import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (

		<div className="text-center mt-5">

			<div id="circle">
				<div class="loader">
					<div class="loader">
						<div class="loader">
							<div class="loader">

							</div>
						</div>

					</div>
				</div>
			</div>

			<div className="alert alert-info">
				{store.token || "Loading message from the backend (make sure your python backend is running)..."}
			</div>
			
		</div>
	);
};