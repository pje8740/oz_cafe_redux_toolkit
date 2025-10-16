import { useState } from "react";
import Item from "./Item";
import OrderModal from "./OrderModal";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/redux";

function Menu({ menu, cart, setCart }) {
  const dispatch = useDispatch();
  const menu = useSelector((state) => state.menu);
  const [modalOn, setModalOn] = useState(false);
  const [modalMenu, setModalMenu] = useState(null);
  if (!menu)
    return (
      <div style={{ textAlign: "center", margin: "80px" }}>
        {" "}
        메뉴 정보가 없어요!
      </div>
    );

  const categorys = Object.keys(menu);
  return (
    <>
      {categorys.map((category) => {
        return (
          <section key={category}>
            <h2>{category}</h2>
            <ul className="menu">
              {menu[category].map((item) => (
                <Item
                  key={item.name}
                  item={item}
                  clickHandler={() => {
                    setModalMenu(item);
                    setModalOn(true);
                  }}
                />
              ))}
            </ul>
          </section>
        );
      })}
      {modalOn && (
        <OrderModal
          modalMenu={modalMenu}
          setModalOn={setModalOn}
          addToCart={(item) => dispatch(addToCart(item))}
        />
      )}
    </>
  );
}

export default Menu;
