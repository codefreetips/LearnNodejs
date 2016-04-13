using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

namespace CsharpTcpClientConsoleApp
{
    class Program
    {
        static string HOST = "127.0.0.1";
        static int PORT = 8080;

        static TcpClient client;

        private static void OpenConnection()
        {
            if (client != null)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Already Opened Connection");
            }
            else
            {
                try
                {
                    client = new TcpClient();
                    client.Connect(HOST, PORT);
                    Console.ForegroundColor = ConsoleColor.Green;
                    Console.WriteLine("Opened Connection Successfully ..");
                }
                catch (Exception ex)
                {
                    client = null;
                    Console.ForegroundColor = ConsoleColor.Red;
                    Console.WriteLine("Error : " + ex.Message);
                }
            }
        }
        private static void CloseConnection()
        {
            if (client == null)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Close Connection or NOT Open");
                return;
            }
            try
            {
                client.Close();
            }
            catch (Exception ex) { }
            finally
            {
                client = null;
            }
            
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine("Close Connection or NOT Open");
        }

        private static void SendData(string data)
        {
            if (client == null)
            {
                Console.ForegroundColor = ConsoleColor.Red;
                Console.WriteLine("Connection NOT Open or Closed");
                return;
            }

            //send
            NetworkStream nwStream = client.GetStream();
            byte[] bytesToSend = ASCIIEncoding.ASCII.GetBytes(data);
            Console.ForegroundColor = ConsoleColor.Yellow;
            Console.WriteLine("Sending : " + data);
            nwStream.Write(bytesToSend, 0, bytesToSend.Length);

            //received
            byte[] bytesToRead = new byte[client.ReceiveBufferSize];
            int bytesRead = nwStream.Read(bytesToRead, 0, client.ReceiveBufferSize);

            Console.ForegroundColor = ConsoleColor.Cyan;
            Console.WriteLine("Receivecd" +  Encoding.ASCII.GetString(bytesToRead,0,bytesRead));
        }

        static void Main(string[] args)
        {
            Console.Clear();
            string lineRead;
            do {

                Console.ResetColor();

                Console.Write("\n\nEnter option (1 - Open, 2 - Send, 3 - Close, 4 - Quit): ");
                lineRead = Console.ReadLine();
                switch(lineRead)
                {
                    case "1":
                        OpenConnection();
                        Console.WriteLine("Option 1 selected");
                        break;

                    case "2":
                        var data = Console.ReadLine();
                        SendData(data);
                        Console.WriteLine("Option 2 selected");
                        break;

                    case "3":
                        CloseConnection();
                        Console.WriteLine("Option 3 selected");
                        break;

                    case "4":
                        Console.WriteLine("Option 4 selected");
                        break;

                    default:
                        //setTimeout(function() {
                        //    menu();
                        //}, 0);

                        //menu();
                        break;
                }

            }
            while (!lineRead.Equals("4"));
        }

       

    }
}
