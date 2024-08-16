import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "./ui/button";
import Image from "next/image";
import { Woolworths } from "@/lib/db/migrations/type";
import LoadingSearchbar from "./LoadingSearchbar";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Searchbar({
  setSelectedProducts,
  selectedProducts,
}: {
  setSelectedProducts: (product: Woolworths[]) => void;
  selectedProducts: Woolworths[];
}) {
  // useState searchResult
  const [store, setStore] = useState("woolworths");
  const [searchResult, setSearchResult] = useState<Woolworths[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 1000);

  // set searchResult empty if search is empty
  useEffect(() => {
    if (!search) {
      setSearchResult(null);
      setIsLoading(false);
    }
  }, [search]);

  // Create a separate function for submission logic
  const submitSearch = async () => {
    console.log("Search term: ", search);
    setIsLoading(true);
    try {
      const response = await fetch("/api/searchGroceries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search, store }),
      });
      const result = await response.json();
      setSearchResult(result);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (search) {
      submitSearch();
    }
  }, [store]);

  useEffect(() => {
    if (debouncedSearch) {
      submitSearch();
    }
  }, [debouncedSearch]);

  const handleProductClick = (product: Woolworths) => {
    // setSelectedProduct(product); // Trigger the callback from ComparePage
    // Add the product to the selected products list
    setSelectedProducts([...selectedProducts, product]);
  };

  return (
    <div className="flex flex-col justify-center relative mx-auto max-w-2xl z-50 h-14 group">
      <div className="relative">
        <div className="flex flex-col gap-2 peer">
          <div className="flex-grow ">
            {/* Flexible container for search bar elements */}
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg bg-background pl-8 "
              placeholder="Search..."
              type="search"
            />
          </div>
          <div className="flex flex-row gap-2">
            <p className="self-center">Store: </p>
            <ToggleGroup
              type="single"
              defaultValue="woolworths"
              value={store}
              onValueChange={(store) => {
                if (store) setStore(store);
              }}
            >
              <ToggleGroupItem
                value="woolworths"
                aria-label="Toggle woolworths"
              >
                Woolworths
              </ToggleGroupItem>
              <ToggleGroupItem value="coles" aria-label="Toggle coles">
                Coles
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        <div className="invisible peer-focus-within:visible hover:visible focus-within:visible">
          {isLoading ? (
            <LoadingSearchbar />
          ) : (
            <div>
              {searchResult && Object.keys(searchResult).length > 0 ? (
                <div className="p-2 mt-2 rounded-md border bg-popover text-popover-foreground shadow-md outline-none absolute top-full left-0 right-0 transition duration-200 ease-in-out group-focus:visible opacity-100">
                  <div>
                    {searchResult.map((item) => (
                      <Button
                        variant={"ghost"}
                        key={item.displayName}
                        className="flex gap-2 mt-1 ml-0 pl-0 w-full justify-start"
                        onClick={() => handleProductClick(item)} // Call handler on click
                      >
                        <Image
                          src={item.imageUrl || ""}
                          alt={item.displayName ?? ""}
                          width={40}
                          height={40}
                          className="rounded-lg border p-1"
                        />
                        <span className=" self-center text-wrap text-left">
                          {item.displayName}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              ) : (
                searchResult && (
                  <div>
                    <div className="p-2 mt-2 rounded-md border bg-popover  text-popover-foreground shadow-md outline-none absolute top-full left-0 right-0 transition duration-200 ease-in-out group-focus:visible opacity-100">
                      No result found.
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
