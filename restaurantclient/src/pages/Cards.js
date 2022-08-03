import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import './Cards.css'
import { useCart } from '../cartContext';
import { Stack } from '@mui/material';
import { useSearchDishes } from '../searchContext';
export default function Cards({ propDishes }) { // propDishes -> cart
  
  const {searchDishes,setSearchDishes} = useSearchDishes()
  const {cart,setCart} = useCart()
  const [dishes,setDishes] = React.useState(propDishes ? (searchDishes ? propDishes.filter(item => item.name.toLowerCase().includes(searchDishes)) : propDishes) : undefined)
  const [dishesCopy,setDishesCopy] = React.useState(propDishes);
  const { id } = useParams()

  const filterBySearch = (item) => item.name.toLowerCase().includes(searchDishes)

  const fetchMenu = () => {
    fetch("http://127.0.0.1:8000/api/dish/")
      .then((res) => res.json())
      .then((data) => {
            // we have search string query
            if(searchDishes)
                setDishes(data.filter(filterBySearch))  
              else { // show all dishes
                setDishes(data)
                setDishesCopy(data)
              }
      }).catch(err => { // data invalid
        setDishes(null)
        console.log(err)
    });
  };


  // Every time search text changes
  React.useEffect(() => {
    if(searchDishes && searchDishes.length > 0)
       // filter by the specific item name
      setDishes((dishesCopy ?? dishes).filter(filterBySearch))
    return () => {
      setSearchDishes('')
    }
  },[searchDishes])

  // when component first loads
  React.useEffect(() => {
    if(propDishes) return; // if we come from cart dishes are in props
    if(id) { // we come from category (navbar)
      if(id != 'all') //checking if id is not showing all array
       filterDishesByCategory(id)
      else fetchMenu() //show all 
    }
  }, [id])

  const filterDishesByCategory = (category_id) => {
    fetch(`http://127.0.0.1:8000/api/dish/?category=${category_id}`)
      .then((res) => res.json())
      .then((data) => {
             // if the category is unvalid  -> set to null to show 'invalid category error'
            if(data.category && data.category[0] === 'Select a valid choice. That choice is not one of the available choices.') {
                setDishes(null)
            } else {
              setDishes(data)  
              setDishesCopy(data) // duplicates the list of dishes, in case filtered the array.
          } 
      }).catch(err => { // invalid data -> server/connection error
          setDishes(null)
          console.log(err)
      });
  };


  

  // server request is on-going (dishes loading)
  if(dishes === undefined) {
    return <div>Loading category dishes...</div>
  }

    // request to server success but no dishes (might be wrong category number)
    if(dishes === null) {
      return <div>An unknown error has occured please try refreshing the page</div> 
    }
   

  return (
    <div className = 'grid_cards'>
          {dishes.map(dish =>{
            return(
            <Card key={dish.id + Math.random()*99999}
                 sx={{ maxWidth: 250, mb: 3.5,padding:2, maxHeight:420 }}>
            <CardMedia
              component="img"
              height="170px"
              width="10%"
            
              image={dish.imageUrl}
              alt="No dish pic"
            />
            <CardContent>
              <Typography gutterBottom variant="h6" component="div">
                {dish.name}
              </Typography>
              <div>${dish.price}</div>
              <Typography variant="body2" height={'50px'} color="text.secondary">
                {dish.description}
              </Typography>
              {dish.isGlutenFree ? <img style={{ width: "20px", height:"15px" }} src="https://cdn-icons-png.flaticon.com/512/1488/1488167.png" /> : null}
              {dish.isVegeterian  ? <img style={{ width: "20px", height:"15px" }} src="https://www.mishloha.co.il/dist/img/item-prop-icons/vegeterianicon.png" /> : null}
              <br/>
              {propDishes && <Typography>
                {"Amount: " + dish.amount}
              </Typography>}
            </CardContent>
            <CardActions>
             <Stack justifyContent={'center'} alignItems ={'center'}>

         
             {!propDishes && <Button size="small"
               style ={{textTransform:'none'}}
               onClick ={() => {
                 let existingIndx = cart.findIndex(item => item.id == dish.id);
                 if(existingIndx === -1) {
                    dish.amount = 1
                    setCart([...cart,dish])
                 } else {
                    let copy = cart
                    copy[existingIndx].amount++;
                    setCart(copy);
                 }
              }}>Add to cart</Button>}
                
               {
                (function deleteButton() {
                    if(propDishes) {
                      return <Button size="small" 
                      style ={{backgroundColor:'#bd3333',color:'white',textTransform:'none'}} onClick ={() => {
                       const existingIndx = cart.findIndex(d => d.id == dish.id) //filter item by id and create new array without it
                       cart[existingIndx].amount--;
                      if(cart[existingIndx].amount == 0) {
                          cart.splice(existingIndx, 1)
                      }
                       setDishes([...cart]) //showing the dishes in the cart
                       setCart([...cart]) //delete specific item from cart
                   }}>Remove from cart</Button>
                  }else return null
                })()
               } 


                  </Stack>
            </CardActions>
          </Card>
            )
        })
    }
    </div>
 
    
  );
}
