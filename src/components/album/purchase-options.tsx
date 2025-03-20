function PurchaseOption({ type, price, imageUrl }: {type:string, price:string, imageUrl:string}){
  return (
    <div className="text-left md:w-4/5">
      <h3 className="text-xl font-bold border-b-2 border-primary inline-block mb-6">{type}</h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
        <div className="w-33 h-32 relative rounded-tl-2xl rounded-br-2xl">
          <img
              src={imageUrl}
              alt={type}
            className="rounded-lg w-full h-full object-cover"
          />
        </div>
        <div>
          <h3 className="text-sm text-black-200 text-left">Precio:</h3>
          <h3 className="text-2xl font-bold mb-4 text-center">{price} €</h3>
          <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-700/90 transition-colors w-full sm:w-auto">
            Añadir al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export function PurchaseOptions(){
  return (
    <div className="mt-6 flex flex-col md:flex-row justify-center gap-8 md:gap-16">
      <PurchaseOption type="CD" price="15,99" imageUrl="src/assets/Disco.png"/>
      <PurchaseOption type="Álbum digital" price="7,99" imageUrl="src/assets/The%20Martin%20Garrix%20Collection.png"/>
    </div>
  )
}

