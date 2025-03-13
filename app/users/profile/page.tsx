import UserAvatar from "@/components/custom/user/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getCurrentUser } from "@/data/getCurrentUser";
import { Package } from "lucide-react";
import { redirect } from "next/navigation";
import UserUpdateForm from "./update";
import { Badge } from "@/components/ui/badge";

async function Page() {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <UserAvatar user={user} className="h-16 w-16" />
              <div>
                <CardTitle className="text-2xl">Mi Perfil</CardTitle>
                <CardDescription>
                  Gestiona tu información personal
                </CardDescription>
              </div>
            </div>
            <Badge variant="outline">{user.role}</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="informacion" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="informacion">Información Personal</TabsTrigger>
          <TabsTrigger value="pedidos">Mis Pedidos</TabsTrigger>
        </TabsList>

        <TabsContent value="informacion" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Información Personal</CardTitle>
              <CardDescription>
                Tu información básica de contacto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <UserUpdateForm user={user} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pedidos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Historial de Pedidos</CardTitle>
              <CardDescription>Revisa tus compras anteriores</CardDescription>
            </CardHeader>
            <CardContent>
              {[
                {
                  id: "ORD-2023-001",
                  fecha: "15/11/2023",
                  estado: "Entregado",
                  total: "€89.99",
                },
                {
                  id: "ORD-2023-002",
                  fecha: "02/12/2023",
                  estado: "En camino",
                  total: "€124.50",
                },
              ].map((pedido) => (
                <div key={pedido.id} className="mb-4 rounded-lg border p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">Pedido #{pedido.id}</div>
                    <div className="text-sm text-muted-foreground">
                      {pedido.fecha}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm">{pedido.estado}</span>
                    </div>
                    <div className="font-medium">{pedido.total}</div>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              ))}

              {/* Si no hay pedidos */}
              {/* <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No tienes pedidos aún</h3>
                <p className="text-sm text-muted-foreground mb-4">Cuando realices una compra, aparecerá aquí</p>
                <Button>Ir a comprar</Button>
              </div> */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default Page;
