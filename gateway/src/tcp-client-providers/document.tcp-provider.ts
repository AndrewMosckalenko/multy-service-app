import { TcpClientOptions, Transport, ClientProxyFactory } from "@nestjs/microservices";

export const documentTcpProvider = {
    provide: 'DOCUMENT_SERVICE',
    useFactory: () => {
      const tokenServiceOptions: TcpClientOptions = {
        transport: Transport.TCP,
        options: {
          host: process.env.BACKEND_DOCUMENT_HOST,
          port: Number(process.env.BACKEND_DOCUMENT_PORT),
        },
      };
      return ClientProxyFactory.create(tokenServiceOptions);
    },
};