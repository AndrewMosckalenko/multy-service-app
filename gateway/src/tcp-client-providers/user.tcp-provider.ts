import { TcpClientOptions, Transport, ClientProxyFactory } from "@nestjs/microservices";

export const userTcpProvider = {
    provide: 'USER_SERVICE',
    useFactory: () => {
      const tokenServiceOptions: TcpClientOptions = {
        transport: Transport.TCP,
        options: {
          host: process.env.BACKEND_USER_HOST,
          port: Number(process.env.BACKEND_USER_PORT),
        },
      };
      return ClientProxyFactory.create(tokenServiceOptions);
    },
};