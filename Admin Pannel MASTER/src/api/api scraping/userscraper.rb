require 'open-uri'
require 'httparty'
require 'nokogiri'
require 'csv'
require 'byebug'

class WebScraper

  def self.scrap

    @object_collection = []
    start_page = 1
    puts "-=START SCRAPING=-"

    #insert the link of the page you wish to scrap
    home_page = "https://api.mymicds.net/v3/background/all"
    #processing the page and parsing it
    open_page = open(home_page)
    read_page = open_page.read
    parsed_page = Nokogiri::HTML.parse(read_page)
    byebug

    #find the main class in the page
    main_block = parsed_page.css('div.listItems')

    #byebug
    #split the web site to parts
    #a good way is to use byebug here to find all the css markers you will use
    # current_page = 1
    per_page = main_block.css('li.c2').css('a').count
    # total_listed = doc.css('tr').css('td')[37].text.split(' ')[4].to_i
    # last_page = (total_listed.to_f / per_page.to_f).round

    #starts the scraping loop
    #Set the values for beggining and end
    while start_page <= 2 #last_page

      #insert the link again and replace the page value with #{start_page}

      all_url = "https://api.mymicds.net/v3/background/all#{start_page}"
      open_all= open(all_url)
      read_all = open_all.read
      parsed_all = Nokogiri::HTML.parse(read_all)

      puts "Current Page ", start_page

      #add the markers for the main page block here
      the_block = parsed_all.css('div.listItems').css('ul.listItem')

      #Starts the loop to extract the data from every element

      the_block.each do |item_in_box|
        item_in_boxs = {
          #Break the main loop to small css markers for every
          #Object you wish to collect data from
          Title: item_in_box.css('li.c2').css('a').text,
          Salary: item_in_box.css('li.c2').css('span.is_visibility_salary').text,
          Location: item_in_box.css('li.c2').css('span.location')[0].text.gsub(/\s+/, "").split(",")[1],
          Date: item_in_box.css('li.c2').css('span.location')[0].text.split(",")[0],
          Company: item_in_box.css('li.c4').css('a').text,
          Link: item_in_box.css('li.c2').css('a')[0].attributes['href'].value

        }
        @object_collection << item_in_boxs

      end
      #Set a break point of the main loop
      #current_page += 1
      start_page += 1

      #check if everithing going smoooth before you lunch the whole loop
      #byebug
    end

  end

  #byebug
  #After the data is extracted export it to csv file

  def self.create_csv
      puts "Writign to CSV File"
      CSV.open('results.csv','wb',) do |csv|
        #csv.to_io.write "\uFEFF"
        keys = @object_collection.map(&:keys).inject(&:|)
        csv << keys
        @object_collection.each do |add|
          csv << add.values_at(*keys)
        end
      end
  end

  def self.send_notification(event_name, your_key)

    link = "https://maker.ifttt.com/trigger/#{event_name}/with/key/#{your_key}"

    HTTParty.get(link)

    puts "Notification Send"
  end

end

WebScraper.scrap
WebScraper.create_csv